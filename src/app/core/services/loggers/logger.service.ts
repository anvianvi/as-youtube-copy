import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export abstract class LoggerService {
  protected abstract prefix: string;

  logMessage(message: string): void {
    // eslint-disable-next-line no-console
    console.log(`${this.prefix}: ${message}`);
  }
}
