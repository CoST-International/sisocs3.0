import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractComponent } from './contract.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { NewContractComponent } from './new-contract/new-contract.component';
import { EditContractComponent } from './edit-contract/edit-contract.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContractDocumentListComponent } from './contract-document-list/contract-document-list.component';


@NgModule({
  declarations: [
    ContractComponent,
    ContractListComponent,
    NewContractComponent,
    EditContractComponent,
    ContractDocumentListComponent
  ],
  imports: [
    CommonModule,
    ContractRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class ContractModule { }
