import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddendaListComponent } from './addenda-list/addenda-list.component';
import { AddendaComponent } from './addenda.component';
import { EditAddendumComponent } from './edit-addendum/edit-addendum.component';
import { NewAddendumComponent } from './new-addendum/new-addendum.component';

const routes: Routes = [
  { path: '', component: AddendaListComponent },
  { path: 'addenda-list', component: AddendaListComponent },
  { path: 'new-addendum', component: NewAddendumComponent },
  { path: 'edit-addendum/:id', component: EditAddendumComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddendaRoutingModule { }
