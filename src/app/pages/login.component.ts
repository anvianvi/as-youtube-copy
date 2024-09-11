import { Component, inject, OnInit, signal } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from "@angular/router";

import { AuthService } from "../core/services/auth.service";
import { SharedModule } from "../shared/shared.module";

@Component({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  standalone: true,
  selector: "app-login-page",
  template: `
    <form [formGroup]="loginForm" class="login-form" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="fill">
        <mat-label>Email</mat-label>
        <input placeholder="" matInput formControlName="email" required />
        @if (
          loginForm.get("email")?.hasError("required") &&
          loginForm.get("email")?.touched
        ) {
          <mat-error>Please enter a login email</mat-error>
        }
        @if (
          loginForm.get("email")?.hasError("email") &&
          loginForm.get("email")?.touched
        ) {
          <mat-error>The login email is invalid</mat-error>
        }
      </mat-form-field>
      <mat-form-field>
        <mat-label>Password</mat-label>
        <input
          matInput
          formControlName="password"
          [type]="hidePassword() ? 'password' : 'text'"
          required
        />
        <button
          type="button"
          mat-icon-button
          matSuffix
          (click)="togglePasswordVisibility()"
          [attr.aria-label]="'Hide password'"
          [attr.aria-pressed]="hidePassword()"
        >
          <mat-icon>{{
            hidePassword() ? "visibility_off" : "visibility"
          }}</mat-icon>
        </button>
        @if (
          loginForm.get("password")?.hasError("required") &&
          loginForm.get("password")?.touched
        ) {
          <mat-error>Please enter a password</mat-error>
        }
      </mat-form-field>
      <div class="buttons-container">
        <a routerLink="/registration" mat-button>Registration</a>

        <button
          type="submit"
          [disabled]="!loginForm.valid || submitInProcess()"
          class="button"
          mat-button
        >
          Login
        </button>
      </div>
    </form>
  `,
  styles: `
    :host {
      margin: 45px auto 0 auto;
      display: flex;
      justify-content: center;
      background: #f2f2f2;
      max-width: 330px;
      padding: 15px;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 10px;

      .buttons-container {
        display: flex;
        align-items: center;
        justify-content: space-around;

        .button {
          background: #2f80ed;
          color: #ffffff;
          width: 124px;
          height: 30px;
          font-size: 12px;
        }

        .button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
    }
  `,
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  loginForm!: FormGroup;
  submitInProcess = signal(false);
  hidePassword = signal(true);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });

    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/"]);
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword.update((value) => !value);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.submitInProcess.set(true);
      const { email, password } = this.loginForm.value;

      if (this.authService.login(email, password)) {
        this.router.navigate(["/"]);
      } else {
        this.snackBar.open("Invalid email or password", "Close", {
          duration: 3000,
        });
      }

      this.submitInProcess.set(false);
    }
  }
}
