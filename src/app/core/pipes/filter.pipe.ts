import { Pipe, PipeTransform } from "@angular/core";
import { VideoItem } from "src/app/models/youtube-response.interface";

@Pipe({
  name: "filter",
  standalone: true,
})
export class FilterVideosPipe implements PipeTransform {
  transform(
    videolist: VideoItem[] | null,
    searchText: string
  ): VideoItem[] | null {
    if (videolist) {
      const videos = [...videolist];
      const lowerCasedText = searchText.toLowerCase();

      return videos.filter((video) => {
        const hasMatchInDescription = video.snippet.description
          .toLowerCase()
          .includes(lowerCasedText);
        const hasMatchInTitle = video.snippet.title
          .toLowerCase()
          .includes(lowerCasedText);
        const hasMatchInTags = video.snippet.tags?.some((tag) =>
          tag.toLowerCase().includes(lowerCasedText)
        );

        return hasMatchInDescription || hasMatchInTitle || hasMatchInTags;
      });
    }

    return videolist;
  }
}
