import { Component, Input } from "@angular/core";

import { VideoItem } from "../models/youtube-response.interface";

interface Statistic {
  key: keyof VideoItem["statistics"];
  icon: string;
  alt: string;
}

@Component({
  standalone: true,
  selector: "app-video-statistics-bar",
  template: `
    <div class="statistics-bar">
      @for (stat of statistics; track stat.key) {
        <div>
          <img [src]="'assets/' + stat.icon" [alt]="stat.alt" />
          <span>{{ video.statistics[stat.key] }}</span>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .statistics-bar {
        width: 202px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
      }
      .statistics-bar div {
        display: flex;
        align-items: center;
        gap: 3px;
      }
      .statistics-bar span {
        color: #4f4f4f;
        font-size: 10px;
      }
    `,
  ],
})
export class VideoStatisticComponent {
  @Input() video!: VideoItem;

  protected readonly statistics: Statistic[] = [
    { key: "viewCount", icon: "viewed-icon.svg", alt: "Views count" },
    { key: "likeCount", icon: "liked-icon.svg", alt: "Likes count" },
    { key: "commentCount", icon: "comment-icon.svg", alt: "Comments count" },
  ];
}
