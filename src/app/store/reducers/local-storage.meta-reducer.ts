import { InjectionToken } from "@angular/core";
import { ActionReducer, MetaReducer } from "@ngrx/store";
import { LocalStorageService } from "src/app/core/services/local-storage.service";

import { AppState } from "../state.model";

export function localStorageMetaReducer(
  localStorageService: LocalStorageService
): MetaReducer<AppState> {
  return (reducer: ActionReducer<AppState>): ActionReducer<AppState> =>
    (state, action) => {
      const nextState = reducer(state, action);
      localStorageService.setItem("app-state", nextState);
      return nextState;
    };
}

export const LOCAL_STORAGE_META_REDUCER = new InjectionToken<
  MetaReducer<AppState>[]
>("Local Storage Meta Reducer");
