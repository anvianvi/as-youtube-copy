import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-login-status-bar",
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="login-info-container">
      @if (isAuthenticated()) {
        <span>{{ userName() }}</span>

        <img
          src="assets/login.svg"
          alt="icon of logged in account"
          [matMenuTriggerFor]="beforeMenu"
        />

        <mat-menu #beforeMenu="matMenu" xPosition="before">
          <span disabled mat-menu-item>Hi {{ userName() }}</span>
          <button mat-menu-item (click)="openAdminPanel()">Admin Panel</button>
          <button mat-menu-item (click)="openFavoritePage()">
            Favorite Panel
          </button>
          <button mat-menu-item (click)="logout()">LogOut</button>
        </mat-menu>
      }
    </div>
  `,
  styles: [
    `
      .login-info-container {
        width: 100px;
        display: flex;
        gap: 8px;
        align-items: center;
        justify-content: flex-end;

        span {
          text-transform: capitalize;
        }

        img {
          filter: drop-shadow(2px 2px 4px rgba(47, 128, 237, 0.25));
          cursor: pointer;
        }
      }
    `,
  ],
})
export class LoginStatusBarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  isAuthenticated = this.authService.isLoggedIn;
  userName = this.authService.userName;

  logout(): void {
    this.authService.logout();
  }

  openAdminPanel(): void {
    this.router.navigate(["/admin"]);
  }

  openFavoritePage(): void {
    this.router.navigate(["/favorite"]);
  }
}
