import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppLayoutComponent} from "./layout/app.layout.component";

const routes: Routes = [
  { path: '', component: AppLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./boxe/pages/home/home.module').then(m => m.HomeModule) },
      { path: 'boxers', loadChildren: () => import('./boxe/pages/boxer/boxer.module').then(m => m.BoxerModule) },
      { path: 'users', loadChildren: () => import('./boxe/pages/user/user.module').then(m => m.UserModule) },
      { path: 'sponsors', loadChildren: () => import('./boxe/pages/sponsor/sponsor.module').then(m => m.SponsorModule) },
      { path: 'events', loadChildren: () => import('./boxe/pages/event/event.module').then(m => m.EventModule) },
    ]
  },
  { path: 'auth', loadChildren: () => import('./boxe/components/auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
