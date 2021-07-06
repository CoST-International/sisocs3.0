import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { EditUserComponent } from './edit-user/edit-user.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NewUserComponent } from './new-user/new-user.component';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserManagementComponent } from './user-management.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UsersListComponent } from './users-list/users-list.component';

@NgModule({
  declarations: [
    UserManagementComponent,
    UsersListComponent,
    NewUserComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class UserManagementModule { }
