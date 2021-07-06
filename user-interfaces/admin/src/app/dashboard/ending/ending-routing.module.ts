import { RouterModule, Routes } from '@angular/router';

import { EditEndingComponent } from './edit-ending/edit-ending.component';
import { EndingComponent } from './ending.component';
import { EndingListComponent } from './ending-list/ending-list.component';
import { NewEndingComponent } from './new-ending/new-ending.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: EndingListComponent },
  { path: 'new-completion', component: NewEndingComponent },
  { path: 'completion-list', component: EndingListComponent },
  { path: 'edit-completion/:id', component: EditEndingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class EndingRoutingModule { }
