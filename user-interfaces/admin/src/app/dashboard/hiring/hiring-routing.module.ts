import { RouterModule, Routes } from '@angular/router';

import { HiringComponent } from './hiring.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: HiringComponent },
  { path: 'contracts', loadChildren: () => import('./contract/contract.module').then(m => m.ContractModule) },
  { path: 'addenda', loadChildren: () => import('./addenda/addenda.module').then(m => m.AddendaModule) },
  { path: 'advances', loadChildren: () => import('./advances/advances.module').then(m => m.AdvancesModule) },
  { path: 'disbursements', loadChildren: () => import('./disbursements/disbursements.module').then(m => m.DisbursementsModule) },
  { path: 'guarantees', loadChildren: () => import('./guarantees/guarantees.module').then(m => m.GuaranteesModule) },
  { path: 'executions', loadChildren: () => import('./execution/execution.module').then(m => m.ExecutionModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HiringRoutingModule { }
