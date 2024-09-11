import { createAction, props } from "@ngrx/store";

import { AppState } from "../state.model";

export const initializeState = createAction(
  "[Init] Initialize State",
  props<{ state: Partial<AppState> }>()
);
