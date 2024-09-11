import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from "@ngrx/store";
import { VideoItem } from "src/app/models/youtube-response.interface";

import { VideoCardsState } from "../reducers/video-cards.reducer";

export const selectVideoCardsState =
  createFeatureSelector<VideoCardsState>("videoCards");

export const selectAllVideoCards = createSelector(
  selectVideoCardsState,
  (state: VideoCardsState) => state?.videoItems ?? []
);

export const selectVideoCardById = (
  videoId: string
): MemoizedSelector<VideoCardsState, VideoItem | undefined> =>
  createSelector(selectAllVideoCards, (videos) =>
    videos.find((video) => video?.id === videoId)
  );

export const selectFavoriteVideoCards = createSelector(
  selectAllVideoCards,
  (videos) => videos.filter((video) => video?.favorite === true)
);

export const selectCustomCards = createSelector(
  selectAllVideoCards,
  (videoItems) => videoItems.filter((item) => item?.isCustom === true)
);
