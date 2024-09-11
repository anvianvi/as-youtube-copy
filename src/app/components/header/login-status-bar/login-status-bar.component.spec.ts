import { signal, WritableSignal } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatMenuModule } from "@angular/material/menu";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";

import { AuthService } from "../../../core/services/auth.service";
import { SharedModule } from "../../../shared/shared.module";
import { LoginStatusBarComponent } from "./login-status-bar.component";

describe("LoginStatusBarComponent", () => {
  let component: LoginStatusBarComponent;
  let fixture: ComponentFixture<LoginStatusBarComponent>;
  let authServiceMock: Partial<AuthService>;
  let isLoggedInSignal: WritableSignal<boolean>;
  let userNameSignal: WritableSignal<string>;

  beforeEach(async () => {
    isLoggedInSignal = signal(false);
    userNameSignal = signal("");

    authServiceMock = {
      isLoggedIn: isLoggedInSignal,
      userName: userNameSignal,
      logout: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        LoginStatusBarComponent,
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatMenuModule,
      ],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginStatusBarComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should not display user info when not authenticated", () => {
    fixture.detectChanges();
    const container = fixture.debugElement.query(
      By.css(".login-info-container")
    );
    expect(container.nativeElement.textContent.trim()).toBe("");
  });

  it("should display user info when authenticated", () => {
    isLoggedInSignal.set(true);
    userNameSignal.set("testuser");
    fixture.detectChanges();

    const container = fixture.debugElement.query(
      By.css(".login-info-container")
    );
    expect(container.nativeElement.textContent).toContain("testuser");
  });
});
