import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { EditOrganizationUnitComponent } from './edit-organization-unit/edit-organization-unit.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NewOrganizationUnitComponent } from './new-organization-unit/new-organization-unit.component';
import { NgModule } from '@angular/core';
import { OrganizationUnitListComponent } from './organization-unit-list/organization-unit-list.component';
import { OrganizationUnitsComponent } from './organization-units.component';
import { OrganizationUnitsRoutingModule } from './organization-units-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    OrganizationUnitsComponent,
    OrganizationUnitListComponent,
    NewOrganizationUnitComponent,
    EditOrganizationUnitComponent
  ],
  imports: [
    CommonModule,
    OrganizationUnitsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ]
})
export class OrganizationUnitsModule { }
