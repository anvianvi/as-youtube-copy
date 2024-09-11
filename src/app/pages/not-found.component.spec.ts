import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";

import { NotFoundComponent } from "./not-found.component";

describe("NotFoundComponent", () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let routerMock: any;

  beforeEach(async () => {
    routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, NotFoundComponent],
      providers: [{ provide: Router, useValue: routerMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have initial counter value set to 5", () => {
    expect(component.counter).toBe(5);
  });
});
