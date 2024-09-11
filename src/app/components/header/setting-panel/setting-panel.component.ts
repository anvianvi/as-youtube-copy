import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FilterService } from "src/app/core/services/filter.service";
import { SortService } from "src/app/core/services/sort.service";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  standalone: true,
  selector: "app-setting-panel",
  templateUrl: "./setting-panel.component.html",
  styleUrls: ["./setting-panel.component.scss"],
  imports: [SharedModule, FormsModule],
})
export class SettingPanelComponent {
  activeSorting = "";

  constructor(
    public sortService: SortService,
    public filterService: FilterService
  ) {}

  onSortByDateClick(): void {
    this.sortService.sortByDate();
  }

  onSortByViewsClick(): void {
    this.sortService.sortByViews();
  }
}
