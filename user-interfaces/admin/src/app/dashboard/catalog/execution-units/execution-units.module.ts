import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExecutionUnitsRoutingModule } from './execution-units-routing.module';
import { ExecutionUnitsComponent } from './execution-units.component';


@NgModule({
  declarations: [
    ExecutionUnitsComponent
  ],
  imports: [
    CommonModule,
    ExecutionUnitsRoutingModule
  ]
})
export class ExecutionUnitsModule { }
