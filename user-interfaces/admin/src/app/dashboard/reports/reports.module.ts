import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { TechniciansComponent } from './technicians/technicians.component';
import { AcquisitionsComponent } from './acquisitions/acquisitions.component';


@NgModule({
  declarations: [
    ReportsComponent,
    TechniciansComponent,
    AcquisitionsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
