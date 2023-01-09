import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppLayoutComponent} from "./layout/app.layout.component";

const routes: Routes = [
  { path: '', component: AppLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./my-home/my-home.module').then(m => m.MyHomeModule) },
    ]
  },
  { path: 'login', loadChildren: () => import('./boxe/components/auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
