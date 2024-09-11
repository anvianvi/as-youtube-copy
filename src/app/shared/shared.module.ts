import { NgModule } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { CustomButtonComponent } from "./components/custom-button.component";

@NgModule({
  declarations: [CustomButtonComponent],
  imports: [],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatMenuModule,
    MatCardModule,
    MatBadgeModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CustomButtonComponent,
    MatPaginatorModule,
  ],
})
export class SharedModule {}
