import { createAction, props } from "@ngrx/store";
import { VideoItem } from "src/app/models/youtube-response.interface";

export const updateVideoList = createAction(
  "[Video Cards] Update Video List",
  props<{ videos: VideoItem[] }>()
);

export const getVideoList = createAction("[Video Cards] Get Video List");

export const getVideoListSuccess = createAction(
  "[Video Cards] Get Video List Success",
  props<{ videos: VideoItem[] }>()
);

export const getVideoListFailure = createAction(
  "[Video Cards] Get Video List Failure",
  props<{ error: unknown }>()
);

export const addCustomCard = createAction(
  "[Video Cards] Add Custom Card",
  props<{ card: VideoItem }>()
);

export const deleteCustomCard = createAction(
  "[Video Cards] Delete Custom Card",
  props<{ cardId: string }>()
);

export const toggleFavorite = createAction(
  "[Video Cards] Toggle Favorite",
  props<{ videoId: string }>()
);
