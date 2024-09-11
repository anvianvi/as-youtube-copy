import { provideHttpClient, withInterceptors } from "@angular/common/http";
import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter, withHashLocation } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";

import { routes } from "./app.routes";
import { YoutubeApiInterceptor } from "./core/interceptors/api.interceptor";
import { LocalStorageService } from "./core/services/local-storage.service";
import { DevLoggerService } from "./core/services/loggers/dev-logger.service";
import { LoggerService } from "./core/services/loggers/logger.service";
import { ProdLoggerService } from "./core/services/loggers/prod-logger.service";
import { VideoCardsEffects } from "./store/effects/video-cards.effects";
import { localStorageMetaReducer } from "./store/reducers/local-storage.meta-reducer";
import { rootReducer } from "./store/state.model";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withInterceptors([YoutubeApiInterceptor])),
    provideAnimationsAsync(),
    {
      provide: LoggerService,
      useClass: isDevMode() ? DevLoggerService : ProdLoggerService,
    },
    provideStore(rootReducer, {
      metaReducers: [localStorageMetaReducer(new LocalStorageService())],
    }),
    provideEffects([VideoCardsEffects]),
  ],
};
