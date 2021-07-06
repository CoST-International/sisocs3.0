import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvanceListComponent } from './advance-list/advance-list.component';
import { AdvancesComponent } from './advances.component';
import { EditAdvanceComponent } from './edit-advance/edit-advance.component';
import { NewAdvanceComponent } from './new-advance/new-advance.component';

const routes: Routes = [
  { path: '', component: AdvanceListComponent },
  { path: 'advance-list', component: AdvanceListComponent },
  { path: 'new-advance', component: NewAdvanceComponent },
  { path: 'edit-advance/:id', component: EditAdvanceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvancesRoutingModule { }
