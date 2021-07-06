import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisbursementsListComponent } from './disbursements-list/disbursements-list.component';
import { DisbursementsComponent } from './disbursements.component';
import { EditDisbursementComponent } from './edit-disbursement/edit-disbursement.component';
import { NewDisbursementComponent } from './new-disbursement/new-disbursement.component';

const routes: Routes = [
  { path: '', component: DisbursementsListComponent },
  { path: 'disbursement-list', component: DisbursementsListComponent },
  { path: 'new-disbursement', component: NewDisbursementComponent },
  { path: 'edit-disbursement', component: EditDisbursementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisbursementsRoutingModule { }
