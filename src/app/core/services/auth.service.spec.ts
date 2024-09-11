import { PLATFORM_ID } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";

import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let service: AuthService;
  let routerMock: jest.Mocked<Router>;

  beforeEach(() => {
    routerMock = {
      navigate: jest.fn(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: routerMock },
        { provide: PLATFORM_ID, useValue: "browser" },
      ],
    });

    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("login", () => {
    it("should login successfully with correct credentials", () => {
      const result = service.login("test@example.com", "Test123!");
      expect(result).toBe(true);
      expect(service.isLoggedIn()).toBe(true);
      expect(service.userName()).toBe("test");
      expect(localStorage.getItem("authToken")).toBe("my_generated_token");
    });

    it("should fail to login with incorrect credentials", () => {
      const result = service.login("wrong@example.com", "WrongPass123!");
      expect(result).toBe(false);
      expect(service.isLoggedIn()).toBe(false);
      expect(service.userName()).toBe("");
      expect(localStorage.getItem("authToken")).toBeNull();
    });
  });

  describe("logout", () => {
    it("should logout successfully", () => {
      service.login("test@example.com", "Test123!");
      service.logout();
      expect(service.isLoggedIn()).toBe(false);
      expect(service.userName()).toBe("");
      expect(localStorage.getItem("authToken")).toBeNull();
      expect(routerMock.navigate).toHaveBeenCalledWith(["/login"]);
    });
  });

  describe("register", () => {
    it("should register a new user successfully", () => {
      const result = service.register(
        "newuser",
        "new@example.com",
        "NewPass123!"
      );
      expect(result).toBe(true);
      expect(service.isLoggedIn()).toBe(true);
      expect(service.userName()).toBe("newuser");
    });

    it("should fail to register an existing user", () => {
      const result = service.register("test", "test@example.com", "Test123!");
      expect(result).toBe(false);
      expect(service.isLoggedIn()).toBe(false);
      expect(service.userName()).toBe("");
    });
  });

  describe("initializeFromStorage", () => {
    it("should initialize from storage if user data exists", () => {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ userName: "storedUser", isLoggedIn: true })
      );

      // Re-create the service to trigger the constructor
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          AuthService,
          { provide: Router, useValue: routerMock },
          { provide: PLATFORM_ID, useValue: "browser" },
        ],
      });

      service = TestBed.inject(AuthService);

      expect(service.isLoggedIn()).toBe(true);
      expect(service.userName()).toBe("storedUser");
    });

    it("should not initialize from storage if user data does not exist", () => {
      localStorage.clear();
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          AuthService,
          { provide: Router, useValue: routerMock },
          { provide: PLATFORM_ID, useValue: "browser" },
        ],
      });

      service = TestBed.inject(AuthService);

      expect(service.isLoggedIn()).toBe(false);
      expect(service.userName()).toBe("");
    });
  });
});
