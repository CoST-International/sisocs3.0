import { RouterModule, Routes } from '@angular/router';

import { AcquisitionComponent } from './acquisition.component';
import { AcquisitionDetailComponent } from './acquisition-detail/acquisition-detail.component';
import { AcquisitionListComponent } from './acquisition-list/acquisition-list.component';
import { EditAcquisitionComponent } from './edit-acquisition/edit-acquisition.component';
import { NewAcquisitionComponent } from './new-acquisition/new-acquisition.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: AcquisitionListComponent },
  { path: 'new-tender', component: NewAcquisitionComponent },
  { path: 'tender-list', component: AcquisitionListComponent },
  { path: 'edit-tender/:id', component: EditAcquisitionComponent },
  { path: 'tender-detail/:id', component: AcquisitionDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcquisitionRoutingModule { }
