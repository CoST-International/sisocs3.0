import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractTypeComponent } from './contract-type.component';

const routes: Routes = [{ path: '', component: ContractTypeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractTypeRoutingModule { }
