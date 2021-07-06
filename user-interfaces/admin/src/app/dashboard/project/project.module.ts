import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddDocumentDialogComponent } from '../../shared/dialogs/add-document-dialog/add-document-dialog.component';
import { AddLocationDialogComponent } from './add-location-dialog/add-location-dialog.component';
import { CommonModule } from '@angular/common';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectComponent } from './project.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectRoutingModule } from './project-routing.module';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { LocationListComponent } from './location-list/location-list.component';
import { ProjectDocumentListComponent } from './project-document-list/project-document-list.component';

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectListComponent,
    NewProjectComponent,
    EditProjectComponent,
    ProjectDetailComponent,
    AddLocationDialogComponent,
    AddDocumentDialogComponent,
    LocationListComponent,
    ProjectDocumentListComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProjectModule { }
