import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HiringMethodTypeRoutingModule } from './hiring-method-type-routing.module';
import { HiringMethodTypeComponent } from './hiring-method-type.component';


@NgModule({
  declarations: [
    HiringMethodTypeComponent
  ],
  imports: [
    CommonModule,
    HiringMethodTypeRoutingModule
  ]
})
export class HiringMethodTypeModule { }
