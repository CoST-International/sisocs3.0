import { RouterModule, Routes } from '@angular/router';

import { EditExecutionComponent } from './edit-execution/edit-execution.component';
import { ExecutionComponent } from './execution.component';
import { ExecutionsListComponent } from './executions-list/executions-list.component';
import { NewExecutionComponent } from './new-execution/new-execution.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: ExecutionsListComponent },
  { path: 'executions-list', component: ExecutionsListComponent },
  { path: 'new-execution', component: NewExecutionComponent },
  { path: 'edit-execution/:id', component: EditExecutionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExecutionRoutingModule { }
