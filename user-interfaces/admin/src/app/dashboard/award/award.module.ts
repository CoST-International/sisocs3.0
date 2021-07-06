import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddBiddersDialogComponent } from './add-bidders-dialog/add-bidders-dialog.component';
import { AwardComponent } from './award.component';
import { AwardListComponent } from './award-list/award-list.component';
import { AwardRoutingModule } from './award-routing.module';
import { CommonModule } from '@angular/common';
import { EditAwardComponent } from './edit-award/edit-award.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NewAwardComponent } from './new-award/new-award.component';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TenderOfferersListComponent } from './tender-offerers-list/tender-offerers-list.component';
import { AwardDocumentListComponent } from './award-document-list/award-document-list.component';
import { AwardDetailComponent } from './award-detail/award-detail.component';

@NgModule({
  declarations: [
    AwardComponent,
    AwardListComponent,
    NewAwardComponent,
    EditAwardComponent,
    AddBiddersDialogComponent,
    TenderOfferersListComponent,
    AwardDocumentListComponent,
    AwardDetailComponent
  ],
  imports: [
    CommonModule,
    AwardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class AwardModule { }
