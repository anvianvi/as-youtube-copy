import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Store } from "@ngrx/store";
import { VideoItem } from "src/app/models/youtube-response.interface";
import { addCustomCard } from "src/app/store/actions/video-cards.actions";
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: "app-admin-panel",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatChipsModule,
  ],
  templateUrl: "./admin-panel.component.html",
  styles: [
    `
      form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        max-width: 500px;
        margin: 0 auto;
      }
      .buttons-container {
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
})
export class AdminPanelComponent implements OnInit {
  createCardForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.createCardForm = this.fb.group({
      title: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      description: ["", [Validators.maxLength(255)]],
      imageLink: ["", [Validators.required]],
      videoLink: ["", [Validators.required]],
      publishedAt: ["", [Validators.required, this.dateNotInFutureValidator]],
      tags: this.fb.array([]),
    });
  }

  get tags(): FormArray {
    return this.createCardForm.get("tags") as FormArray;
  }

  addTag(): void {
    if (this.tags.length < 5) {
      this.tags.push(
        this.fb.group({
          tag: ["", Validators.required],
        })
      );
    }
  }

  removeTag(index: number): void {
    this.tags.removeAt(index);
  }

  onSubmit(): void {
    if (this.createCardForm.valid) {
      const formValues = this.createCardForm.value;

      const newCustomCard: VideoItem = {
        id: `mycustomcard-${uuidv4().substr(0, 6)}`,
        isCustom: true,
        favorite: false,
        statistics: {
          viewCount: "0",
          likeCount: "0",
          commentCount: "0",
        },
        snippet: {
          publishedAt: formValues.publishedAt,
          title: formValues.title,
          description: formValues.description,
          thumbnails: {
            default: {
              url: formValues.imageLink,
            },
          },
          tags: formValues.tags
            .map((tagGroup: { tag: string }) => tagGroup.tag)
            .filter(Boolean),
        },
      };

      this.store.dispatch(addCustomCard({ card: newCustomCard }));

      this.snackBar.open("Video successfully created", "Close", {
        duration: 3000,
        horizontalPosition: "center",
        verticalPosition: "bottom",
      });

      this.resetForm();
    }
  }

  resetForm(): void {
    this.createCardForm.reset();
    while (this.tags.length !== 0) {
      this.tags.removeAt(0);
    }
  }

  dateNotInFutureValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    return selectedDate > currentDate ? { futureDate: true } : null;
  }
}
