import { isPlatformBrowser } from "@angular/common";
import {
  computed,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from "@angular/core";
import { Router } from "@angular/router";

interface User {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  private readonly userKey = "authToken";
  private readonly userStorageKey = "currentUser";

  private users: User[] = [
    { username: "test", email: "test@example.com", password: "Test123!" },
    { username: "anvi", email: "anvi@example.com", password: "Anvi123!" },
  ];

  private isLoggedInSignal = signal<boolean>(false);
  private userNameSignal = signal<string>("");

  public isLoggedIn = computed(() => this.isLoggedInSignal());
  public userName = computed(() => this.userNameSignal());

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeFromStorage();
    }
  }

  private initializeFromStorage(): void {
    const storedUser = this.getItem(this.userStorageKey);
    if (storedUser) {
      const { userName, isLoggedIn } = JSON.parse(storedUser);
      this.userNameSignal.set(userName);
      this.isLoggedInSignal.set(isLoggedIn);
    }
  }

  private updateLocalStorage(): void {
    this.setItem(
      this.userStorageKey,
      JSON.stringify({
        userName: this.userNameSignal(),
        isLoggedIn: this.isLoggedInSignal(),
      })
    );
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const authToken = "my_generated_token";
      this.setItem(this.userKey, authToken);
      this.isLoggedInSignal.set(true);
      this.userNameSignal.set(user.username);
      this.updateLocalStorage();
      return true;
    }

    return false;
  }

  logout(): void {
    this.clearStorage();
    this.isLoggedInSignal.set(false);
    this.userNameSignal.set("");
    this.router.navigate(["/login"]);
  }

  register(username: string, email: string, password: string): boolean {
    if (this.users.some((u) => u.username === username || u.email === email)) {
      return false;
    }

    this.users.push({ username, email, password });
    return this.login(email, password);
  }

  private getItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  private setItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  private clearStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }
}
