import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatDescription",
  standalone: true,
})
export class FormatDescriptionPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/\n/g, "<br>");
  }
}
