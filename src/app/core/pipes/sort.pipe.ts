import { Pipe, PipeTransform } from "@angular/core";
import { VideoItem } from "src/app/models/youtube-response.interface";

import { SortBy, SortOrder } from "../services/sort.service";

@Pipe({
  name: "sort",
  standalone: true,
})
export class SortPipe implements PipeTransform {
  transform(
    videolist: VideoItem[] | null,
    sortBy: SortBy,
    sortOrder: SortOrder
  ): VideoItem[] | null {
    if (sortBy === "") {
      return videolist;
    }
    if (videolist) {
      const value = [...videolist];
      value.sort((a, b) => {
        const firstValue =
          sortBy === "date"
            ? new Date(a.snippet.publishedAt).getTime()
            : Number(a.statistics.viewCount);
        const secondValue =
          sortBy === "date"
            ? new Date(b.snippet.publishedAt).getTime()
            : Number(b.statistics.viewCount);

        if (sortOrder === "asc") {
          return firstValue - secondValue;
        }
        return secondValue - firstValue;
      });

      return value;
    }
    return videolist;
  }
}
