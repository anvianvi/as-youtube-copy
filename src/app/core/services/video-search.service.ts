import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import {
  VideoItem,
  YouTubeResponseDetailed,
} from "src/app/models/youtube-response.interface";

import { ApiSearchService } from "./api-search.service";

@Injectable({
  providedIn: "root",
})
export class VideoSearchService {
  constructor(private apiSearchService: ApiSearchService) {}

  searchVideos(query: string): Observable<VideoItem[]> {
    return this.apiSearchService.fetchVideos(query).pipe(
      switchMap((response) => {
        const videoIds = response.items.map((item) => item.id.videoId);
        if (videoIds.length === 0) {
          const emptyResponse: YouTubeResponseDetailed = {
            kind: "youtube#videoListResponse",
            etag: "",
            items: [],
            pageInfo: {
              totalResults: 0,
              resultsPerPage: 0,
            },
          };
          return of(emptyResponse);
        }
        return this.apiSearchService.fetchDetailedVideo(videoIds);
      }),
      map(
        (videosResponse: YouTubeResponseDetailed) => videosResponse.items || []
      )
    );
  }
}
