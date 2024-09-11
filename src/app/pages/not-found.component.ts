import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { finalize, interval, takeWhile, tap } from "rxjs";

@Component({
  selector: "app-not-found",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="not-found-wrapper">
      <img class="not-found-logo" src="assets/404.svg" alt="Page not found" />
      <span>Sorry, page doesn't exist.</span>
    </div>
    <p>
      Redirecting to the home page in {{ counter }}
      {{ counter === 1 ? "second" : "seconds" }}...
    </p>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        text-align: center;
        font-family: Arial, sans-serif;
      }
      .not-found-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        margin-bottom: 20px;
      }
      .not-found-logo {
        max-width: 200px;
        height: auto;
      }
      span {
        color: #4a4a4a;
        font-size: 1.5rem;
        font-weight: 600;
        max-width: 300px;
      }
      p {
        color: #6a6a6a;
        font-size: 1rem;
      }
    `,
  ],
})
export class NotFoundComponent {
  private router = inject(Router);
  counter = 5;

  constructor() {
    interval(1000)
      .pipe(
        takeWhile(() => this.counter > 0),
        tap(() => {
          this.counter -= 1;
        }),
        finalize(() => this.router.navigate(["/"])),
        takeUntilDestroyed()
      )
      .subscribe();
  }
}
