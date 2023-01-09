import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyHomeRoutingModule } from './my-home-routing.module';
import { MyHomeComponent } from './my-home/my-home.component';


@NgModule({
  declarations: [
    MyHomeComponent,
  ],
  imports: [
    CommonModule,
    MyHomeRoutingModule
  ]
})
export class MyHomeModule { }
