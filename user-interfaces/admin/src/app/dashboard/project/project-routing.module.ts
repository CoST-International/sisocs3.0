import { RouterModule, Routes } from '@angular/router';

import { EditProjectComponent } from './edit-project/edit-project.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { NgModule } from '@angular/core';
import { ProjectComponent } from './project.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectListComponent } from './project-list/project-list.component';

const routes: Routes = [
  { path: '', component: ProjectListComponent },
  { path: 'view-project', component: ProjectListComponent },
  { path: 'new-project', component: NewProjectComponent },
  { path: 'project-detail/:id', component: ProjectDetailComponent },
  { path: 'edit-project/:id', component: EditProjectComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class ProjectRoutingModule { }
