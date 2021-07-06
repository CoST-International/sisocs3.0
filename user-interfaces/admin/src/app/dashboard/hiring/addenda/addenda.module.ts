import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddendaRoutingModule } from './addenda-routing.module';
import { AddendaComponent } from './addenda.component';
import { AddendaListComponent } from './addenda-list/addenda-list.component';
import { NewAddendumComponent } from './new-addendum/new-addendum.component';
import { EditAddendumComponent } from './edit-addendum/edit-addendum.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddendaDocumentListComponent } from './addenda-document-list/addenda-document-list.component';


@NgModule({
  declarations: [
    AddendaComponent,
    AddendaListComponent,
    NewAddendumComponent,
    EditAddendumComponent,
    AddendaDocumentListComponent
  ],
  imports: [
    CommonModule,
    AddendaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class AddendaModule { }
