import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvancesRoutingModule } from './advances-routing.module';
import { AdvancesComponent } from './advances.component';
import { NewAdvanceComponent } from './new-advance/new-advance.component';
import { EditAdvanceComponent } from './edit-advance/edit-advance.component';
import { AdvanceListComponent } from './advance-list/advance-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AdvancesComponent,
    NewAdvanceComponent,
    EditAdvanceComponent,
    AdvanceListComponent
  ],
  imports: [
    CommonModule,
    AdvancesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class AdvancesModule { }
