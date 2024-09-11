import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { provideMockStore } from "@ngrx/store/testing";

import { PublicationDateDirective } from "../core/directives/publication-date.directive";
import { VideoItem } from "../models/youtube-response.interface";
import { VideoItemCardComponent } from "./video-item-card.component";
import { VideoStatisticComponent } from "./video-statistics-bar.component";

describe("VideoItemCardComponent", () => {
  let component: VideoItemCardComponent;
  let fixture: ComponentFixture<VideoItemCardComponent>;

  const mockVideoItem: VideoItem = {
    id: "123",
    snippet: {
      title: "Test Video",
      publishedAt: "2023-01-01T00:00:00Z",
      thumbnails: {
        default: {
          url: "http://example.com/thumbnail.jpg",
        },
      },
    },
    statistics: {
      viewCount: "1000",
      likeCount: "100",
      commentCount: "50",
    },
    favorite: false,
  } as VideoItem;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        VideoItemCardComponent,
        PublicationDateDirective,
        VideoStatisticComponent,
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoItemCardComponent);
    component = fixture.componentInstance;
    component.video = mockVideoItem;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display video thumbnail", () => {
    const img = fixture.nativeElement.querySelector(".video-preview");
    expect(img.src).toBe(mockVideoItem.snippet.thumbnails.default.url);
    expect(img.alt).toBe(`Thumbnail of video: ${mockVideoItem.snippet.title}`);
  });

  it("should display video title", () => {
    const title = fixture.nativeElement.querySelector(".video-title");
    expect(title.textContent.trim()).toBe(mockVideoItem.snippet.title);
  });

  it("should apply PublicationDateDirective", () => {
    const section = fixture.nativeElement.querySelector("section");
    expect(section.getAttribute("ng-reflect-app-publication-date")).toBe(
      mockVideoItem.snippet.publishedAt
    );
  });

  it("should render VideoStatisticComponent", () => {
    const statisticsComponent = fixture.nativeElement.querySelector(
      "app-video-statistics-bar"
    );
    expect(statisticsComponent).toBeTruthy();
  });

  it('should display "Follow" button when video is not favorite', () => {
    const followButton = fixture.nativeElement.querySelector(
      ".card-button:not(.favorite)"
    );
    expect(followButton.textContent.trim()).toBe("Follow");
  });

  it('should display "Unfollow" button when video is favorite', () => {
    component.video.favorite = true;
    fixture.detectChanges();
    const unfollowButton = fixture.nativeElement.querySelector(
      ".card-button.favorite"
    );
    expect(unfollowButton.textContent.trim()).toBe("Unfollow");
  });
});
