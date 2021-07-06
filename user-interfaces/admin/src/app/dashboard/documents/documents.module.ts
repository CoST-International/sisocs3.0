import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsComponent } from './documents.component';
import { DocumentsListComponent } from './documents-list/documents-list.component';
import { NewDocumentComponent } from './new-document/new-document.component';
import { EditDocumentComponent } from './edit-document/edit-document.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DocumentsComponent,
    DocumentsListComponent,
    NewDocumentComponent,
    EditDocumentComponent
  ],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class DocumentsModule { }
