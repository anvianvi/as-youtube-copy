import { Component, signal } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";

import { LoginStatusBarComponent } from "./login-status-bar/login-status-bar.component";
import { SearchComponent } from "./search-bar/search.component";
import { SettingPanelComponent } from "./setting-panel/setting-panel.component";
import { SettingsButtonComponent } from "./settings-button/settings-button.component";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [
    SharedModule,
    RouterLink,
    RouterLinkActive,
    SettingsButtonComponent,
    SearchComponent,
    SettingPanelComponent,
    LoginStatusBarComponent,
  ],
  template: `
    <header class="header-content-wrapper">
      <div class="spacer"></div>

      <div class="main-bar">
        <div>
          <a
            routerLink="/"
            routerLinkActive="active"
            ariaCurrentWhenActive="page"
            aria-label="Logo"
          >
            <img class="logo" src="assets/logo.png" alt="site logo" />
          </a>
        </div>
        <div class="serchbar"><app-search-bar></app-search-bar></div>

        <app-settings-button
          (click)="toggleSettingsPanel()"
        ></app-settings-button>
      </div>
      <app-login-status-bar></app-login-status-bar>
    </header>

    <div class="setting-panel" [class.visible]="isSettingsPanelVisible()">
      <app-setting-panel></app-setting-panel>
    </div>
  `,
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  isSettingsPanelVisible = signal(false);

  toggleSettingsPanel(): void {
    this.isSettingsPanelVisible.update((value) => !value);
  }
}
