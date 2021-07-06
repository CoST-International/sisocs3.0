import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EndingRoutingModule } from './ending-routing.module';
import { EndingComponent } from './ending.component';
import { EndingListComponent } from './ending-list/ending-list.component';

import { NewEndingComponent } from './new-ending/new-ending.component';
import { EditEndingComponent } from './edit-ending/edit-ending.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EndingDocumentListComponent } from './ending-document-list/ending-document-list.component';


@NgModule({
  declarations: [
    EndingComponent,
    EndingListComponent,
    NewEndingComponent,
    EditEndingComponent,
    EndingDocumentListComponent
  ],
  imports: [
    CommonModule,
    EndingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class EndingModule { }
