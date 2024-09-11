import { Injectable } from "@angular/core";

export type SortBy = "" | "date" | "views";
export type SortOrder = "asc" | "desc";

@Injectable({
  providedIn: "root",
})
export class SortService {
  sortBy: SortBy;
  sortOrder: SortOrder;

  constructor() {
    this.sortBy = "";
    this.sortOrder = "asc";
  }

  sortByDate(): void {
    this.sortBy = "date";
    this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
  }

  sortByViews(): void {
    this.sortBy = "views";
    this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
  }
}
