import { RouterModule, Routes } from '@angular/router';

import { EditOrganizationUnitComponent } from './edit-organization-unit/edit-organization-unit.component';
import { NewOrganizationUnitComponent } from './new-organization-unit/new-organization-unit.component';
import { NgModule } from '@angular/core';
import { OrganizationUnitListComponent } from './organization-unit-list/organization-unit-list.component';
import { OrganizationUnitsComponent } from './organization-units.component';

const routes: Routes = [
  { path: '', component: OrganizationUnitListComponent },
  { path: 'organization-units', component: OrganizationUnitListComponent },
  { path: 'new-organization-unit', component: NewOrganizationUnitComponent },
  { path: 'edit-organization-unit/:id', component: EditOrganizationUnitComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class OrganizationUnitsRoutingModule { }
