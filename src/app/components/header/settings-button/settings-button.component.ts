import { Component, signal } from "@angular/core";

@Component({
  standalone: true,
  selector: "app-settings-button",
  template: `
    <div class="settings-button" (click)="toggleAnimation()">
      @for (line of lines; track line; let i = $index) {
        <div class="set-btn-line">
          <div
            #dot
            class="dot"
            [class.dot1]="i === 0"
            [class.dot2]="i === 1"
            [class.dot3]="i === 2"
            [class.clicked]="isClicked()"
          ></div>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .settings-button {
        width: 24px;
        height: 24px;
        padding: 7px 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: #2f80ed;
        cursor: pointer;
        border-radius: 5px;
        box-shadow: 2px 0px 4px 0px #2f80ed;
        transition: all 0.3s ease;
      }
      .set-btn-line {
        background: #e5e5e5;
        width: 15px;
        height: 1px;
        border-radius: 10px;
        position: relative;
      }
      .dot {
        position: absolute;
        top: -1px;
        background: #e5e5e5;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        transition: all 0.3s ease;
      }
      .dot1 {
        left: 11px;
      }
      .dot2 {
        left: 1px;
      }
      .dot3 {
        left: 11px;
      }
      .dot1.clicked {
        left: 1px;
      }
      .dot2.clicked {
        left: 11px;
      }
      .dot3.clicked {
        left: 1px;
      }
    `,
  ],
})
export class SettingsButtonComponent {
  isClicked = signal(false);
  lines = [0, 1, 2];

  toggleAnimation(): void {
    this.isClicked.update((clicked) => !clicked);
  }
}
