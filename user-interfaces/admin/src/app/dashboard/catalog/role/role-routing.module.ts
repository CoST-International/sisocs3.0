import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { RoleComponent } from './role.component';
import { RoleListComponent } from './role-list/role-list.component';

const routes: Routes = [
  { path: '', component: RoleListComponent },
  { path: 'role-list', component: RoleListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
