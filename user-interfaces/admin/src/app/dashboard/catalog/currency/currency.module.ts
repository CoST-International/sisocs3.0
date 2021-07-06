import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyRoutingModule } from './currency-routing.module';
import { CurrencyComponent } from './currency.component';


@NgModule({
  declarations: [
    CurrencyComponent
  ],
  imports: [
    CommonModule,
    CurrencyRoutingModule
  ]
})
export class CurrencyModule { }
