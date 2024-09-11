import { Component, Input, ViewEncapsulation } from "@angular/core";

type ButtonStyle = "default" | "search";

@Component({
  selector: "app-custom-button",
  template: `
    <button [class]="buttonClass">
      <ng-content></ng-content>
    </button>
  `,
  styles: [
    `
      .app-custom-button {
        width: 120px;
        height: 32px;
        background: #2f80ed;
        color: #fff;
        font-size: 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        box-shadow: 2px 0px 4px 0px #2f80ed;
      }

      .app-custom-button.search {
        width: 80px;
        height: 24px;
        border-radius: 0px 4px 4px 0px;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CustomButtonComponent {
  @Input() addStyle: ButtonStyle = "default";

  get buttonClass(): string {
    return `app-custom-button ${this.addStyle}`;
  }
}
