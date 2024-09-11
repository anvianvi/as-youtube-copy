import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectFavoriteVideoCards } from "src/app/store/selectors/video-cards.selectors";

import { VideoItemCardComponent } from "../components/video-item-card.component";

@Component({
  selector: "app-favorite-page",
  standalone: true,
  imports: [AsyncPipe, VideoItemCardComponent],
  template: `
    <div class="favorite-content-wrapper">
      @if (videolist$ | async; as videolist) {
        @if (videolist.length) {
          @for (video of videolist; track video.id) {
            <app-video-item-card [video]="video"></app-video-item-card>
          }
        } @else {
          <p class="template message">No videos available.</p>
        }
      }
    </div>
  `,
  styles: [
    `
      .favorite-content-wrapper {
        max-width: 1200px;
        margin-inline: auto;
        padding: 29px;
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
})
export class FavoritePageComponent {
  private store = inject(Store);
  videolist$ = this.store.select(selectFavoriteVideoCards);
}
