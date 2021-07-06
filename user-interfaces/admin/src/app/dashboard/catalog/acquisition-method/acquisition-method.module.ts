import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcquisitionMethodRoutingModule } from './acquisition-method-routing.module';
import { AcquisitionMethodComponent } from './acquisition-method.component';


@NgModule({
  declarations: [
    AcquisitionMethodComponent
  ],
  imports: [
    CommonModule,
    AcquisitionMethodRoutingModule
  ]
})
export class AcquisitionMethodModule { }
