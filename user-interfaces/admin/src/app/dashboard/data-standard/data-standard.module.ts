import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataStandardRoutingModule } from './data-standard-routing.module';
import { DataStandardComponent } from './data-standard.component';


@NgModule({
  declarations: [
    DataStandardComponent
  ],
  imports: [
    CommonModule,
    DataStandardRoutingModule
  ]
})
export class DataStandardModule { }
