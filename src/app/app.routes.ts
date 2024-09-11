import { Routes } from "@angular/router";

import { AuthGuard } from "./core/guards/auth.guard";
import { MainPageComponent } from "./pages/main.component";
import { NotFoundComponent } from "./pages/not-found.component";

export const routes: Routes = [
  {
    path: "",
    component: MainPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "details/:id",
    loadComponent: () =>
      import(
        "./pages/detailed-information/detailed-information.component"
      ).then((m) => m.DetailedInformationComponent),
    canActivate: [AuthGuard],
  },
  {
    path: "favorite",
    loadComponent: () =>
      import("./pages/favorite.component").then((m) => m.FavoritePageComponent),
    canActivate: [AuthGuard],
  },
  {
    path: "admin",
    loadComponent: () =>
      import("./pages/admin-panel/admin-panel.component").then(
        (m) => m.AdminPanelComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "login",
    loadComponent: () =>
      import("./pages/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "registration",
    loadComponent: () =>
      import("./pages/registration/registration.component").then(
        (m) => m.RegistrationComponent
      ),
  },
  { path: "**", component: NotFoundComponent },
];
