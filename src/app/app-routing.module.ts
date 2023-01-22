import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppLayoutComponent} from "./layout/app.layout.component";

const routes: Routes = [
  { path: '', component: AppLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./boxe/pages/home/home.module').then(m => m.HomeModule) },
      { path: 'boxers', loadChildren: () => import('./boxe/pages/boxer/boxer.module').then(m => m.BoxerModule) },

    ]
  },
  { path: 'auth', loadChildren: () => import('./boxe/components/auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
