import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancingSourceRoutingModule } from './financing-source-routing.module';
import { FinancingSourceComponent } from './financing-source.component';


@NgModule({
  declarations: [
    FinancingSourceComponent
  ],
  imports: [
    CommonModule,
    FinancingSourceRoutingModule
  ]
})
export class FinancingSourceModule { }
