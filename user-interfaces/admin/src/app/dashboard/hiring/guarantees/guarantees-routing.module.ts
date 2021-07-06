import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditGuaranteeComponent } from './edit-guarantee/edit-guarantee.component';
import { GuaranteeListComponent } from './guarantee-list/guarantee-list.component';
import { NewGuaranteeComponent } from './new-guarantee/new-guarantee.component';

const routes: Routes = [
  { path: '', component: GuaranteeListComponent },
  { path: 'guarantee-list', component: GuaranteeListComponent },
  { path: 'new-guarantee', component: NewGuaranteeComponent },
  { path: 'edit-guarantee', component: EditGuaranteeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuaranteesRoutingModule { }
