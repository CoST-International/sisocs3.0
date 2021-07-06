import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HiringMethodRoutingModule } from './hiring-method-routing.module';
import { HiringMethodComponent } from './hiring-method.component';


@NgModule({
  declarations: [
    HiringMethodComponent
  ],
  imports: [
    CommonModule,
    HiringMethodRoutingModule
  ]
})
export class HiringMethodModule { }
