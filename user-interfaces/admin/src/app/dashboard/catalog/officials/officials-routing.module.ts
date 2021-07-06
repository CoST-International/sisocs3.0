import { RouterModule, Routes } from '@angular/router';

import { EditOfficialComponent } from './edit-official/edit-official.component';
import { NewOfficialComponent } from './new-official/new-official.component';
import { NgModule } from '@angular/core';
import { OfficialsComponent } from './officials.component';
import { OfficialsListComponent } from './officials-list/officials-list.component';

const routes: Routes = [
  { path: '', component: OfficialsListComponent },
  { path: 'officials', component: OfficialsListComponent },
  { path: 'new-official', component: NewOfficialComponent },
  { path: 'edit-official/:id', component: EditOfficialComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficialsRoutingModule { }
