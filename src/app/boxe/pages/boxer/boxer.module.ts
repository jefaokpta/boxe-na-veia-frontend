import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxerRoutingModule } from './boxer-routing.module';
import { BoxerComponent } from './boxer.component';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import { NewBoxerComponent } from './new-boxer/new-boxer.component';
import {CalendarModule} from "primeng/calendar";
import {InputNumberModule} from "primeng/inputnumber";


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
    CalendarModule,
    InputNumberModule
  ]
})
export class BoxerModule { }
