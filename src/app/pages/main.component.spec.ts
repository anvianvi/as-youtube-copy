import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PageEvent } from "@angular/material/paginator";
import { By } from "@angular/platform-browser";
import { MockStore, provideMockStore } from "@ngrx/store/testing";

import { FilterService } from "../core/services/filter.service";
import { SortService } from "../core/services/sort.service";
import { selectAllVideoCards } from "../store/selectors/video-cards.selectors";
import { MainPageComponent } from "./main.component";

describe("MainPageComponent", () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let store: MockStore;
  let filterService: FilterService;
  let sortService: SortService;

  const initialState = {
    videoCards: [],
  };

  beforeEach(async () => {
    filterService = new FilterService();
    sortService = new SortService();

    await TestBed.configureTestingModule({
      imports: [MainPageComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: FilterService, useValue: filterService },
        { provide: SortService, useValue: sortService },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have initial pageSize set to 20 and pageIndex set to 0", () => {
    expect(component.pageSize()).toBe(20);
    expect(component.pageIndex()).toBe(0);
  });

  it("should update pageIndex and pageSize on page change", () => {
    const event: PageEvent = { pageIndex: 2, pageSize: 10, length: 100 };
    component.onPageChange(event);

    expect(component.pageIndex()).toBe(2);
    expect(component.pageSize()).toBe(10);
  });

  it("should display a message when the video list is empty", () => {
    store.overrideSelector(selectAllVideoCards, []);
    store.refreshState();
    fixture.detectChanges();

    const message = fixture.debugElement.query(By.css("p")).nativeElement
      .textContent;
    expect(message).toContain("Please use the search");
  });
});
