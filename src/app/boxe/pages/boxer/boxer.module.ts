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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FileUploadModule} from "primeng/fileupload";
import {RippleModule} from "primeng/ripple";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import { EditBoxerComponent } from './edit-boxer/edit-boxer.component';


@NgModule({
  declarations: [
    BoxerComponent,
    NewBoxerComponent,
    EditBoxerComponent
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
    FormsModule,
    FileUploadModule,
    RippleModule,
    ReactiveFormsModule,
    ToastModule
  ], providers: [MessageService]
})
export class BoxerModule { }
