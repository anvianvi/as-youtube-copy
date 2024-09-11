import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from "rxjs";
import { VideoSearchService } from "src/app/core/services/video-search.service";
import { VideoItem } from "src/app/models/youtube-response.interface";
import { SharedModule } from "src/app/shared/shared.module";
import * as VideoCardsActions from "src/app/store/actions/video-cards.actions";

@Component({
  standalone: true,
  selector: "app-search-bar",
  template: `
    <input
      class="search-input"
      type="text"
      [(ngModel)]="inputText"
      placeholder="What do you want to find out?"
      (keyup)="onSearch()"
    />
  `,
  styles: `
    .search-input {
      border-radius: 4px 0px 0px 4px;
      width: 396px;
      height: 24px;
      background: #efefef;
      outline: 0;
      border: 0;
      @media (width < 1400px) {
        width: fit-content;
        padding: 0 5px;
      }
    }
  `,
  imports: [SharedModule, FormsModule],
})
export class SearchComponent implements OnInit, OnDestroy {
  private videoSearch = inject(VideoSearchService);
  private store = inject(Store);

  inputText = "";
  private searchSubject = new Subject<string>();
  private destroySubject = new Subject<void>();
  private minQueryLength = 3;
  private debounceTimeMs = 900;

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(this.debounceTimeMs),
        distinctUntilChanged(),
        takeUntil(this.destroySubject)
      )
      .subscribe((searchValue) => {
        if (searchValue.length >= this.minQueryLength) {
          this.performSearch(searchValue);
        }
      });
  }

  private performSearch(searchValue: string): void {
    this.videoSearch
      .searchVideos(searchValue)
      .pipe(takeUntil(this.destroySubject))
      .subscribe((videos: VideoItem[]) => {
        // Dispatch the updateVideoList action with the search results
        this.store.dispatch(VideoCardsActions.updateVideoList({ videos }));
      });
  }

  onSearch(): void {
    this.searchSubject.next(this.inputText);
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
    this.searchSubject.complete();
  }
}
