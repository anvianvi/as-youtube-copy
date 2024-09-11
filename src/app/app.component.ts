import { Component, inject, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";

import { HeaderComponent } from "./components/header/header.component";
import { LocalStorageService } from "./core/services/local-storage.service";
import { initializeState } from "./store/actions/init.actions";
import { AppState } from "./store/state.model";

@Component({
  selector: "app-root",
  standalone: true,
  template: `
    <app-header></app-header>
    <router-outlet />
  `,
  styleUrl: "./app.component.scss",
  imports: [RouterOutlet, HeaderComponent],
})
export class AppComponent implements OnInit {
  private store = inject(Store<AppState>);
  private localStorageService = inject(LocalStorageService);

  ngOnInit(): void {
    const savedState = this.localStorageService.getItem("app-state");
    if (savedState) {
      this.store.dispatch(initializeState({ state: savedState }));
    }
  }
}
