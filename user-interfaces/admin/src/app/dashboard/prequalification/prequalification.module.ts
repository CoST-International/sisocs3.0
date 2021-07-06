import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrequalificationRoutingModule } from './prequalification-routing.module';
import { PrequalificationComponent } from './prequalification.component';
import { PrequalificationListComponent } from './prequalification-list/prequalification-list.component';
import { NewPrequalificationComponent } from './new-prequalification/new-prequalification.component';
import { EditPrequalificationComponent } from './edit-prequalification/edit-prequalification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrequalificationDocumentListComponent } from './prequalification-document-list/prequalification-document-list.component';
import { PrequalificationDetailComponent } from './prequalification-detail/prequalification-detail.component';


@NgModule({
  declarations: [
    PrequalificationComponent,
    PrequalificationListComponent,
    NewPrequalificationComponent,
    EditPrequalificationComponent,
    PrequalificationDocumentListComponent,
    PrequalificationDetailComponent
  ],
  imports: [
    CommonModule,
    PrequalificationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class PrequalificationModule { }
