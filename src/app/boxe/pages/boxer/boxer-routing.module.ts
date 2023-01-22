import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BoxerComponent} from "./boxer.component";
import {NewBoxerComponent} from "./new-boxer/new-boxer.component";

const routes: Routes = [
  { path: '', component: BoxerComponent},
  { path: 'new', component: NewBoxerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoxerRoutingModule { }
