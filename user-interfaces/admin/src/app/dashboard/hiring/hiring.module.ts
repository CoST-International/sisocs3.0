import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HiringRoutingModule } from './hiring-routing.module';
import { HiringComponent } from './hiring.component';


@NgModule({
  declarations: [
    HiringComponent
  ],
  imports: [
    CommonModule,
    HiringRoutingModule
  ]
})
export class HiringModule { }
