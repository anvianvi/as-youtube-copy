import { DatePipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, switchMap } from "rxjs";
import { SharedModule } from "src/app/shared/shared.module";
import { selectVideoCardById } from "src/app/store/selectors/video-cards.selectors";

import { VideoStatisticComponent } from "../../components/video-statistics-bar.component";
import { PublicationDateDirective } from "../../core/directives/publication-date.directive";
import { FormatDescriptionPipe } from "../../core/pipes/format-description.pipe";

@Component({
  selector: "app-detailed-information",
  standalone: true,
  imports: [
    SharedModule,
    PublicationDateDirective,
    FormatDescriptionPipe,
    DatePipe,
    VideoStatisticComponent,
  ],
  templateUrl: "./detailed-information.component.html",
  styleUrls: ["./detailed-information.component.scss"],
})
export class DetailedInformationComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);

  video = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get("id")),
      switchMap((id) => {
        if (!id) {
          this.router.navigate(["/404"]);
          return [];
        }
        return this.store.select(selectVideoCardById(id));
      })
    )
  );

  constructor() {
    if (this.video() === undefined) {
      this.router.navigate(["/404"]);
    }
  }

  goBack(): void {
    this.router.navigate(["/"]);
  }
}
