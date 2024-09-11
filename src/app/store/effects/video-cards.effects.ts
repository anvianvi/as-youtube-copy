import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { VideoSearchService } from "src/app/core/services/video-search.service";
import * as VideoCardsActions from "src/app/store/actions/video-cards.actions";

@Injectable()
export class VideoCardsEffects {
  constructor(
    private actions$: Actions,
    private apiSearchService: VideoSearchService
  ) {}

  getVideoCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VideoCardsActions.getVideoList),
      mergeMap(() =>
        this.apiSearchService.searchVideos("your-query").pipe(
          map((videos) => VideoCardsActions.getVideoListSuccess({ videos })),
          catchError((error) =>
            of(VideoCardsActions.getVideoListFailure({ error }))
          )
        )
      )
    )
  );
}
