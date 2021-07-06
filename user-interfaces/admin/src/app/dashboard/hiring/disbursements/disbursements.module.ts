import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisbursementsRoutingModule } from './disbursements-routing.module';
import { DisbursementsComponent } from './disbursements.component';
import { DisbursementsListComponent } from './disbursements-list/disbursements-list.component';
import { NewDisbursementComponent } from './new-disbursement/new-disbursement.component';
import { EditDisbursementComponent } from './edit-disbursement/edit-disbursement.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';


@NgModule({
  declarations: [
    DisbursementsComponent,
    DisbursementsListComponent,
    NewDisbursementComponent,
    EditDisbursementComponent
  ],
  imports: [
    CommonModule,
    DisbursementsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class DisbursementsModule { }
