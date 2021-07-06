import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuaranteeTypesRoutingModule } from './guarantee-types-routing.module';
import { GuaranteeTypesComponent } from './guarantee-types.component';


@NgModule({
  declarations: [
    GuaranteeTypesComponent
  ],
  imports: [
    CommonModule,
    GuaranteeTypesRoutingModule
  ]
})
export class GuaranteeTypesModule { }
