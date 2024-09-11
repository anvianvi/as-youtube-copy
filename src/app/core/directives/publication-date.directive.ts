import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";

enum BorderColor {
  red = "#EB5757",
  yellow = "#F2C94C",
  green = "#27AE60",
  blue = "#2F80ED",
}

@Directive({
  selector: "[appPublicationDate]",
  standalone: true,
})
export class PublicationDateDirective {
  @Input() set appPublicationDate(date: string | null) {
    if (!date) return;

    const currentDate = new Date();
    const publicationDate = new Date(date);
    const differenceInDays = Math.floor(
      (currentDate.getTime() - publicationDate.getTime()) / (1000 * 3600 * 24)
    );

    const borderColor = this.getBorderColor(differenceInDays);
    this.setBorderColor(borderColor);
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  private getBorderColor(differenceInDays: number): BorderColor {
    switch (true) {
      case differenceInDays > 180:
        return BorderColor.red;
      case differenceInDays >= 30:
        return BorderColor.yellow;
      case differenceInDays >= 7:
        return BorderColor.green;
      default:
        return BorderColor.blue;
    }
  }

  private setBorderColor(color: BorderColor): void {
    this.renderer.setStyle(
      this.el.nativeElement,
      "border-bottom",
      `5px solid ${color}`
    );
  }
}
