import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxerRoutingModule } from './boxer-routing.module';
import { BoxerComponent } from './boxer.component';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";


@NgModule({
  declarations: [
    BoxerComponent
  ],
  imports: [
    CommonModule,
    BoxerRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule
  ]
})
export class BoxerModule { }
