import { Injectable } from "@angular/core";
import { AppState } from "src/app/store/state.model";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  setItem(key: string, value: Partial<AppState>): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): Partial<AppState> | null {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as Partial<AppState>) : null;
  }
}
