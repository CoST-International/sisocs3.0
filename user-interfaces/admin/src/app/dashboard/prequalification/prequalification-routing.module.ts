import { RouterModule, Routes } from '@angular/router';

import { EditPrequalificationComponent } from './edit-prequalification/edit-prequalification.component';
import { NewPrequalificationComponent } from './new-prequalification/new-prequalification.component';
import { NgModule } from '@angular/core';
import { PrequalificationComponent } from './prequalification.component';
import { PrequalificationDetailComponent } from './prequalification-detail/prequalification-detail.component';
import { PrequalificationListComponent } from './prequalification-list/prequalification-list.component';

const routes: Routes = [
  { path: '', component: PrequalificationListComponent },
  { path: 'prequalifications', component: PrequalificationListComponent },
  { path: 'new-prequalification', component: NewPrequalificationComponent },
  { path: 'edit-prequalification/:id', component: EditPrequalificationComponent },
  { path: 'prequalification-detail/:id', component: PrequalificationDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class PrequalificationRoutingModule { }
