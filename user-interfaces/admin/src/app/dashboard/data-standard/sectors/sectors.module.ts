import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectorsRoutingModule } from './sectors-routing.module';
import { SectorsComponent } from './sectors.component';


@NgModule({
  declarations: [
    SectorsComponent
  ],
  imports: [
    CommonModule,
    SectorsRoutingModule
  ]
})
export class SectorsModule { }
