import { createReducer, on } from "@ngrx/store";
import { VideoItem } from "src/app/models/youtube-response.interface";
import * as VideoCardsActions from "src/app/store/actions/video-cards.actions";

export interface VideoCardsState {
  videoItems: VideoItem[];
  videoIds: string[];
  favoriteIds: string[];
  error?: string;
}

const initialVideoCardsState: VideoCardsState = {
  videoItems: [],
  videoIds: [],
  favoriteIds: [],
};

export const videoCardsReducer = createReducer(
  initialVideoCardsState,
  on(
    VideoCardsActions.getVideoList,
    (state): VideoCardsState => ({
      ...state,
    })
  ),
  on(VideoCardsActions.getVideoListSuccess, (state, { videos }) => ({
    ...state,
    videoItems: videos,
    videoIds: videos.map((video) => video.id),
  })),
  on(VideoCardsActions.updateVideoList, (state, { videos }) => {
    const customCards = state.videoItems.filter((item) => item.isCustom);
    const favoriteVideos = state.videoItems.filter((item) => item.favorite);

    const newList = [...customCards, ...favoriteVideos, ...videos];

    const uniqueList = newList.filter((item, index) => {
      const jsonItem = JSON.stringify(item);
      return (
        index === newList.findIndex((obj) => JSON.stringify(obj) === jsonItem)
      );
    });

    return {
      ...state,
      videoItems: uniqueList,
      videoIds: [...uniqueList.map((card) => card.id)],
    };
  }),
  on(
    VideoCardsActions.getVideoListFailure,
    (state, { error }): VideoCardsState => ({
      ...state,
      error: `Video card get failed: ${error}`,
    })
  ),
  on(
    VideoCardsActions.addCustomCard,
    (state, { card }): VideoCardsState => ({
      ...state,
      videoItems: [card, ...state.videoItems],
    })
  ),
  on(VideoCardsActions.toggleFavorite, (state, { videoId }) => {
    const updatedVideos = state.videoItems.map((video) => {
      if (video.id === videoId) {
        return { ...video, favorite: !video.favorite };
      }
      return video;
    });

    return {
      ...state,
      videoItems: updatedVideos,
      videoIds: updatedVideos.map((video) => video.id),
    };
  }),
  on(VideoCardsActions.deleteCustomCard, (state, { cardId }) => ({
    ...state,
    videoItems: state.videoItems.filter((card) => card.id !== cardId),
  }))
);
