import { RouterModule, Routes } from '@angular/router';

import { EditEntityComponent } from './edit-entity/edit-entity.component';
import { EntitiesComponent } from './entities.component';
import { EntityListComponent } from './entity-list/entity-list.component';
import { NewEntityComponent } from './new-entity/new-entity.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: EntityListComponent },
  { path: 'entities', component: EntityListComponent },
  { path: 'new-entity', component: NewEntityComponent },
  { path: 'edit-entity/:id', component: EditEntityComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntitiesRoutingModule { }
