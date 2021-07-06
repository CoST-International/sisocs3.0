import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { EditPreparationComponent } from './edit-preparation/edit-preparation.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NewPreparationComponent } from './new-preparation/new-preparation.component';
import { NgModule } from '@angular/core';
import { PreparationComponent } from './preparation.component';
import { PreparationListComponent } from './preparation-list/preparation-list.component';
import { PreparationRoutingModule } from './preparation-routing.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddFundingSourcesComponent } from 'src/app/shared/dialogs/add-funding-sources/add-funding-sources.component';
import { FundingSourceListComponent } from './funding-source-list/funding-source-list.component';
import { PreparationDocumentListComponent } from './preparation-document-list/preparation-document-list.component';
import { PreparationDetailComponent } from './preparation-detail/preparation-detail.component';

@NgModule({
  declarations: [
    PreparationComponent,
    PreparationListComponent,
    NewPreparationComponent,
    EditPreparationComponent,
    AddFundingSourcesComponent,
    FundingSourceListComponent,
    PreparationDocumentListComponent,
    PreparationDetailComponent,
  ],
  imports: [
    CommonModule,
    PreparationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class PreparationModule { }
