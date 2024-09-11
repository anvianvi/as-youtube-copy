import { Component, computed, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { PageEvent } from "@angular/material/paginator";
import { Store } from "@ngrx/store";

import { VideoItemCardComponent } from "../components/video-item-card.component";
import { FilterVideosPipe } from "../core/pipes/filter.pipe";
import { SortPipe } from "../core/pipes/sort.pipe";
import { FilterService } from "../core/services/filter.service";
import { SortService } from "../core/services/sort.service";
import { SharedModule } from "../shared/shared.module";
import { selectAllVideoCards } from "../store/selectors/video-cards.selectors";

@Component({
  imports: [VideoItemCardComponent, SharedModule, FilterVideosPipe, SortPipe],
  standalone: true,
  selector: "app-main-page",
  template: `
    <div class="main-content-wrapper">
      @if (videolist().length) {
        <mat-paginator
          [length]="videolist().length"
          [pageSize]="pageSize()"
          (page)="onPageChange($event)"
        ></mat-paginator>
        <div class="cards-container">
          @for (
            video of paginatedVideoList()
              | filter: filterService.filterValue
              | sort: sortService.sortBy : sortService.sortOrder;
            track video.id
          ) {
            <app-video-item-card [video]="video"></app-video-item-card>
          }
        </div>
      } @else {
        <p style="text-align: center;">Please use the search</p>
      }
    </div>
  `,
  styles: [
    `
      .main-content-wrapper {
        max-width: 1300px;
        margin-inline: auto;
        padding: 29px;
      }

      .cards-container {
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
        justify-content: center;
      }
    `,
  ],
})
export class MainPageComponent {
  private store = inject(Store);
  public sortService = inject(SortService);
  public filterService = inject(FilterService);

  videolist = toSignal(this.store.select(selectAllVideoCards), {
    initialValue: [],
  });

  pageSize = signal(20);
  pageIndex = signal(0);

  paginatedVideoList = computed(() => {
    const startIndex = this.pageIndex() * this.pageSize();
    return this.videolist().slice(startIndex, startIndex + this.pageSize());
  });

  onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}
