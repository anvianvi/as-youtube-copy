import { ActionReducerMap } from "@ngrx/store";

import {
  videoCardsReducer,
  VideoCardsState,
} from "./reducers/video-cards.reducer";

export interface AppState {
  videoCards: VideoCardsState;
}

export const rootReducer: ActionReducerMap<AppState> = {
  videoCards: videoCardsReducer,
};
