import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "src/environments/environment";

export const YoutubeApiInterceptor: HttpInterceptorFn = (req, next) => {
  const API_TOKEN = environment.youtubeApiToken;

  const modifiedRequest = req.clone({
    setParams: {
      key: API_TOKEN,
    },
  });

  return next(modifiedRequest);
};
