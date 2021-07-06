import { RouterModule, Routes } from '@angular/router';

import { AwardComponent } from './award.component';
import { AwardDetailComponent } from './award-detail/award-detail.component';
import { AwardListComponent } from './award-list/award-list.component';
import { EditAwardComponent } from './edit-award/edit-award.component';
import { NewAwardComponent } from './new-award/new-award.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: AwardListComponent },
  { path: 'new-award', component: NewAwardComponent },
  { path: 'award-list', component: AwardListComponent },
  { path: 'edit-award/:id', component: EditAwardComponent },
  { path: 'award-detail/:id', component: AwardDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AwardRoutingModule { }
