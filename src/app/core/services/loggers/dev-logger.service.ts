import { Injectable } from "@angular/core";

import { LoggerService } from "./logger.service";

@Injectable({
  providedIn: "root",
})
export class DevLoggerService extends LoggerService {
  protected prefix = "[DEV]";
}
