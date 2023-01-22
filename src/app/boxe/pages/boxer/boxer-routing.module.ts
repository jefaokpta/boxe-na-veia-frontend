import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BoxerComponent} from "./boxer.component";

const routes: Routes = [
  { path: '', component: BoxerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoxerRoutingModule { }
