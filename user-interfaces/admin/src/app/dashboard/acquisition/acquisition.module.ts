import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcquisitionRoutingModule } from './acquisition-routing.module';
import { AcquisitionComponent } from './acquisition.component';
import { AcquisitionListComponent } from './acquisition-list/acquisition-list.component';
import { NewAcquisitionComponent } from './new-acquisition/new-acquisition.component';
import { EditAcquisitionComponent } from './edit-acquisition/edit-acquisition.component';

import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcquisitionDocumentListComponent } from './acquisition-document-list/acquisition-document-list.component';
import { AcquisitionDetailComponent } from './acquisition-detail/acquisition-detail.component';


@NgModule({
  declarations: [
    AcquisitionComponent,
    AcquisitionListComponent,
    NewAcquisitionComponent,
    EditAcquisitionComponent,
    AcquisitionDocumentListComponent,
    AcquisitionDetailComponent,

  ],
  imports: [
    CommonModule,
    AcquisitionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class AcquisitionModule { }
