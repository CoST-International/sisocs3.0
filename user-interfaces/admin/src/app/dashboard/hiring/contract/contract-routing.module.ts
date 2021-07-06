import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractComponent } from './contract.component';
import { EditContractComponent } from './edit-contract/edit-contract.component';
import { NewContractComponent } from './new-contract/new-contract.component';

const routes: Routes = [
  { path: '', component: ContractListComponent },
  { path: 'contract-list', component: ContractListComponent },
  { path: 'new-contract', component: NewContractComponent },
  { path: 'edit-contract/:id', component: EditContractComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
