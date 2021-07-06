import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuaranteesRoutingModule } from './guarantees-routing.module';
import { GuaranteesComponent } from './guarantees.component';
import { GuaranteeListComponent } from './guarantee-list/guarantee-list.component';
import { NewGuaranteeComponent } from './new-guarantee/new-guarantee.component';
import { EditGuaranteeComponent } from './edit-guarantee/edit-guarantee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    GuaranteesComponent,
    GuaranteeListComponent,
    NewGuaranteeComponent,
    EditGuaranteeComponent
  ],
  imports: [
    CommonModule,
    GuaranteesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class GuaranteesModule { }
