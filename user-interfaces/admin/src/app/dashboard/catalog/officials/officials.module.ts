import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { EditOfficialComponent } from './edit-official/edit-official.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NewOfficialComponent } from './new-official/new-official.component';
import { NgModule } from '@angular/core';
import { OfficialsComponent } from './officials.component';
import { OfficialsListComponent } from './officials-list/officials-list.component';
import { OfficialsRoutingModule } from './officials-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    OfficialsComponent,
    OfficialsListComponent,
    NewOfficialComponent,
    EditOfficialComponent
  ],
  imports: [
    CommonModule,
    OfficialsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ]
})
export class OfficialsModule { }
