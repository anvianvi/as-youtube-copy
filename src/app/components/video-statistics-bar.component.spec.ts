import { ComponentFixture, TestBed } from "@angular/core/testing";

import { VideoItem } from "../models/youtube-response.interface";
import { VideoStatisticComponent } from "./video-statistics-bar.component";

describe("VideoStatisticComponent", () => {
  let component: VideoStatisticComponent;
  let fixture: ComponentFixture<VideoStatisticComponent>;

  const mockVideoItem: VideoItem = {
    statistics: {
      viewCount: "1000",
      likeCount: "100",
      commentCount: "50",
    },
  } as VideoItem;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoStatisticComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoStatisticComponent);
    component = fixture.componentInstance;
    component.video = mockVideoItem;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display correct number of statistics", () => {
    const statisticsElements = fixture.nativeElement.querySelectorAll(
      ".statistics-bar > div"
    );
    expect(statisticsElements.length).toBe(3);
  });

  it("should display correct icons", () => {
    const icons = fixture.nativeElement.querySelectorAll(".statistics-bar img");
    expect(icons[0].src).toContain("viewed-icon.svg");
    expect(icons[1].src).toContain("liked-icon.svg");
    expect(icons[2].src).toContain("comment-icon.svg");
  });

  it("should display correct alt text for icons", () => {
    const icons = fixture.nativeElement.querySelectorAll(".statistics-bar img");
    expect(icons[0].alt).toBe("Views count");
    expect(icons[1].alt).toBe("Likes count");
    expect(icons[2].alt).toBe("Comments count");
  });

  it("should display correct statistics values", () => {
    const statisticsValues = fixture.nativeElement.querySelectorAll(
      ".statistics-bar span"
    );
    expect(statisticsValues[0].textContent).toBe("1000");
    expect(statisticsValues[1].textContent).toBe("100");
    expect(statisticsValues[2].textContent).toBe("50");
  });
});
