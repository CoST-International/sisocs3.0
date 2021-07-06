import { RouterModule, Routes } from '@angular/router';

import { EditPreparationComponent } from './edit-preparation/edit-preparation.component';
import { NewPreparationComponent } from './new-preparation/new-preparation.component';
import { NgModule } from '@angular/core';
import { PreparationComponent } from './preparation.component';
import { PreparationDetailComponent } from './preparation-detail/preparation-detail.component';
import { PreparationListComponent } from './preparation-list/preparation-list.component';

const routes: Routes = [
  { path: '', component: PreparationListComponent },
  { path: 'view-preparation', component: PreparationListComponent },
  { path: 'preparation-detail/:id', component: PreparationDetailComponent },
  { path: 'new-preparation', component: NewPreparationComponent },
  { path: 'edit-preparation/:id', component: EditPreparationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreparationRoutingModule { }
