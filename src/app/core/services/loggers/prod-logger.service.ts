import { Injectable } from "@angular/core";

import { LoggerService } from "./logger.service";

@Injectable({
  providedIn: "root",
})
export class ProdLoggerService extends LoggerService {
  protected prefix = "[PROD]";
}
