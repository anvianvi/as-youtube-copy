import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  YouTubeResponse,
  YouTubeResponseDetailed,
} from "src/app/models/youtube-response.interface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiSearchService {
  private API_URL = "https://www.googleapis.com/youtube/v3/search";
  private VIDEO_URL = "https://www.googleapis.com/youtube/v3/videos";
  private readonly API_TOKEN = environment.youtubeApiToken;

  constructor(private http: HttpClient) {}

  fetchVideos(query: string): Observable<YouTubeResponse> {
    const params = new HttpParams()
      .set("q", query)
      .set("key", this.API_TOKEN)
      .set("part", "snippet")
      .set("type", "video")
      .set("maxResults", "30");

    return this.http.get<YouTubeResponse>(this.API_URL, { params });
  }

  fetchDetailedVideo(videoIds: string[]): Observable<YouTubeResponseDetailed> {
    const params = new HttpParams()
      .set("key", this.API_TOKEN)
      .set("id", videoIds.join(","))
      .set("part", "snippet,statistics");

    return this.http.get<YouTubeResponseDetailed>(this.VIDEO_URL, { params });
  }
}
