import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxerRoutingModule } from './boxer-routing.module';
import { BoxerComponent } from './boxer.component';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import { NewBoxerComponent } from './new-boxer/new-boxer.component';
import {InputNumberModule} from "primeng/inputnumber";
import {InputMaskModule} from "primeng/inputmask";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BoxerComponent,
    NewBoxerComponent
  ],
  imports: [
    CommonModule,
    BoxerRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    InputMaskModule,
    DropdownModule,
    FormsModule
  ]
})
export class BoxerModule { }
