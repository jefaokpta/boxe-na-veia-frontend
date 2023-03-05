import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import {DividerModule} from "primeng/divider";
import {StyleClassModule} from "primeng/styleclass";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";


@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    DividerModule,
    StyleClassModule,
    ButtonModule,
    RippleModule
  ]
})
export class LandingModule { }
