import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurposeRoutingModule } from './purpose-routing.module';
import { PurposeComponent } from './purpose.component';


@NgModule({
  declarations: [
    PurposeComponent
  ],
  imports: [
    CommonModule,
    PurposeRoutingModule
  ]
})
export class PurposeModule { }
