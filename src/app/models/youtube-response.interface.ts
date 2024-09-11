export interface YouTubeResponse {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: SearchItem[];
}

export interface SearchItem {
  id: { kind?: string; videoId: string };
  snippet: VideoSnippet;
  statistics: VideoStatistics;
}

export interface YouTubeResponseDetailed {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: VideoItem[];
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface VideoItem {
  id: string;
  snippet: VideoSnippet;
  statistics: VideoStatistics;
  favorite: boolean;
  isCustom?: boolean;
}
interface VideoSnippet {
  publishedAt: string;
  channelId?: string;
  title: string;
  description: string;
  thumbnails: {
    default: Thumbnail;
    medium?: Thumbnail;
    high?: Thumbnail;
    standard?: Thumbnail;
    maxres?: Thumbnail;
  };
  channelTitle?: string;
  tags: string[];
  categoryId?: string;
  defaultAudioLanguage?: string;
}

interface Thumbnail {
  url: string;
  width?: number;
  height?: number;
}

interface VideoStatistics {
  viewCount: string;
  likeCount: string;
  favoriteCount?: string;
  commentCount: string;
}
