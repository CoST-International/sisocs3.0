import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractTypeRoutingModule } from './contract-type-routing.module';
import { ContractTypeComponent } from './contract-type.component';


@NgModule({
  declarations: [
    ContractTypeComponent
  ],
  imports: [
    CommonModule,
    ContractTypeRoutingModule
  ]
})
export class ContractTypeModule { }
