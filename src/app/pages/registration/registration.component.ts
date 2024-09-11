import { Component, inject, OnInit, signal } from "@angular/core";
import {
  AbstractControl,
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
import { AuthService } from "src/app/core/services/auth.service";
import { SharedModule } from "src/app/shared/shared.module";

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
  selector: "app-registration-page",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  registrationForm!: FormGroup;
  submitInProcess = signal(false);
  hidePassword = signal(true);

  ngOnInit(): void {
    this.createForm();

    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/"]);
    }
  }

  createForm(): void {
    this.registrationForm = this.fb.group(
      {
        email: ["", [Validators.required, Validators.email]],
        username: ["", [Validators.required]],
        password: ["", [Validators.required, this.passwordStrengthValidator]],
        confirmPassword: ["", Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  togglePasswordVisibility(): void {
    this.hidePassword.update((value) => !value);
  }

  passwordStrengthValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const { value } = control;
    const hasMinLength = value && value.length >= 8;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const isStrongPassword =
      hasMinLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar;
    return isStrongPassword ? null : { weakPassword: true };
  }

  passwordMatchValidator(
    group: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = group.get("password")?.value;
    const confirmPassword = group.get("confirmPassword")?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.submitInProcess.set(true);
      const { email, username, password } = this.registrationForm.value;

      if (this.authService.register(username, email, password)) {
        this.router.navigate(["/"]);
      } else {
        this.snackBar.open(
          "Registration failed. Email or username might already exist.",
          "Close",
          {
            duration: 3000,
          }
        );
      }

      this.submitInProcess.set(false);
    }
  }
}
