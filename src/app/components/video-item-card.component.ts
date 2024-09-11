import { Component, inject, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { PublicationDateDirective } from "../core/directives/publication-date.directive";
import { VideoItem } from "../models/youtube-response.interface";
import { SharedModule } from "../shared/shared.module";
import { toggleFavorite } from "../store/actions/video-cards.actions";
import { VideoStatisticComponent } from "./video-statistics-bar.component";

@Component({
  selector: "app-video-item-card",
  standalone: true,
  template: `
    <section
      class="video-item-card"
      [appPublicationDate]="video.snippet.publishedAt"
    >
      <img
        class="video-preview"
        [src]="video.snippet.thumbnails.default.url"
        [alt]="'Thumbnail of video: ' + video.snippet.title"
      />

      <app-video-statistics-bar [video]="video"></app-video-statistics-bar>

      <div class="title-wrapper">
        <h2 class="video-title" [title]="video.snippet.title">
          {{ video.snippet.title }}
        </h2>
      </div>

      <div class="buttons-container">
        <button
          type="button"
          class="card-button"
          (click)="toggleFavorite()"
          [class.favorite]="video.favorite"
        >
          {{ video.favorite ? "Unfollow" : "Follow" }}
        </button>

        <button
          type="button"
          class="card-button"
          (click)="openDetailedInformationPage()"
        >
          more...
        </button>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .video-item-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 5px;
        background: #e5e5e5;
        padding: 20px;
        box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
      }
      .video-preview {
        width: 223px;
        height: 123px;
        background: #c4c4c4;
        margin-bottom: 20px;
        object-fit: cover;
      }
      .title-wrapper {
        width: 202px;
        overflow: hidden;
      }
      .video-title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #4f4f4f;
        text-align: right;
        font-size: 20px;
        margin-bottom: 20px;
      }
      .buttons-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      .card-button {
        width: 80px;
        height: 32px;
        background: #2f80ed;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        box-shadow: 2px 0px 4px 0px #2f80ed;
      }

      .card-button.favorite {
        background: #9d9d9d;
        color: white;
        box-shadow: 2px 0px 4px 0px #9d9d9d;
      }
    `,
  ],
  imports: [SharedModule, PublicationDateDirective, VideoStatisticComponent],
})
export class VideoItemCardComponent {
  @Input() video!: VideoItem;

  private router = inject(Router);
  private store = inject(Store);

  openDetailedInformationPage(): void {
    this.router.navigate([`/details/${this.video.id}`]);
  }

  toggleFavorite(): void {
    this.store.dispatch(toggleFavorite({ videoId: this.video.id }));
  }
}
