import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { EditExecutionComponent } from './edit-execution/edit-execution.component';
import { ExecutionComponent } from './execution.component';
import { ExecutionRoutingModule } from './execution-routing.module';
import { ExecutionsListComponent } from './executions-list/executions-list.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NewExecutionComponent } from './new-execution/new-execution.component';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ExecutionComponent,
    ExecutionsListComponent,
    NewExecutionComponent,
    EditExecutionComponent
  ],
  imports: [
    CommonModule,
    ExecutionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class ExecutionModule { }
