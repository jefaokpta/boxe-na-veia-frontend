import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BoxerComponent} from "./boxer.component";
import {NewBoxerComponent} from "./new-boxer/new-boxer.component";
import {EditBoxerComponent} from "./edit-boxer/edit-boxer.component";

const routes: Routes = [
  { path: '', component: BoxerComponent},
  { path: 'new', component: NewBoxerComponent},
  { path: 'edit/:id', component: EditBoxerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoxerRoutingModule { }
