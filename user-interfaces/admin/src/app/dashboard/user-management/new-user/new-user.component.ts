import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

import { TooltipPosition } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { EntitiesService } from 'src/app/dashboard/catalog/entities/_services/entities.service';
import { IOrganization, IOrganizationData } from 'src/app/shared/interfaces/organization/IOrganization';
import { IRole, IRoleAttributes, IRoleData } from 'src/app/shared/interfaces/role/IRole';
import { RoleService } from 'src/app/dashboard/catalog/role/_services/roles/role.service';

import { MatchValidator } from 'src/app/shared/helpers/MatchValidator';
import { IUserAttributes } from '../../../shared/interfaces/user/IUser';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  isLoading!: boolean;
  isRequestLoading: boolean = false;
  errorMessage: string = '';

  userForm!: FormGroup;

  roles!: IRoleData;
  organizations!: IOrganizationData;

  filteredRoles: any;
  filteredResponsibleOrganizations: any;

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];

  subscription!: Subscription;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _authService: AuthService,
    private _roleService: RoleService,
    private _entitiesServices: EntitiesService,
    private _notificationService: NotificationService,
  ) {
    this.getRoles();
    this.getOrganizations();
  }

  ngOnInit(): void {
    this.setUpUserForm();
  }

  setUpUserForm(): void {
    this.userForm = this.fb.group({
      'name': ['', [Validators.required, Validators.minLength(3)]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(8)]],
      'confirm_password': ['', Validators.required],
      'organization_id': [!this._authService.isAdmin() ? this._authService.getUserOrganization()['organization'] : null, [this._authService.isAdmin() || this._authService.isPEAdmin() ? Validators.required : '']],
      'role_id': ['', [this._authService.isAdmin() || this._authService.isPEAdmin() ? Validators.required : '']],
    }, {
      validator: MatchValidator('password', 'confirm_password')
    });
  }



  saveUser(formValue: FormGroup) {

    if(this.userForm.invalid) {
      return;
    }

    let user: IUserAttributes = {
      'id': '',
      'name': formValue.controls.name.value,
      'email': formValue.controls.email.value,
      'password': formValue.controls.password.value,
      'role_id': formValue.controls.role_id.value.id,
      'organization_id': formValue.controls.organization_id.value.id ? formValue.controls.organization_id.value.id : this._authService.getUserOrganization()['organization']['id'],
    }

    this.isRequestLoading = true;

    this.subscription = this._authService.registerUser(user).subscribe(
      (user) => {
        this.isRequestLoading = false;
        this.router.navigate(['/dashboard/user-management']);
        this._notificationService.showSuccessNotification('Registered Successfully!', 'User has been Registered.');
      },
      (error) => {
        this.isRequestLoading = false;
      }
    )
  }

  getOrganizations() {
    this.isLoading = true;
    this.subscription = this._entitiesServices.getAllEntities({page: 1, limit: 20}).subscribe(
      (entities) => {
        this.isLoading = false;
        this.organizations = entities;

        this.filteredResponsibleOrganizations = this.responsibleOrganization?.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }

  getRoles() {
    this.isLoading = true;
    this.subscription = this._roleService.getAllRoles({page: 1, limit: 30}).subscribe(
      (roles) => {
        this.isLoading = false;
        this.roles = roles

        this.filteredRoles = this.role?.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filterRole(value))
          );
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }

  displayState(state: any) {
    return state ? state.organization_name : '';
  }

  displayStateRole(state: any) {
    return state ? state.name : '';
  }
  displayStateEntities(state: any) {
    return state ? state.title : '';
  }

  displayStateUsers(state: any) {
    return state ? state.email : '';
  }

  private _filter(value: any): any[] {
    let name = value.organization_name || value;

    return this.organizations?.data.filter(option => option.organization_name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  private _filterRole(value: any): any[] {
    let name = value.name || value;

    return this.roles?.data.filter(option => option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  get responsibleOrganization() {
    return this.userForm.get('organization_id');
  }

  get role() {
    return this.userForm.get('role_id');
  }

  get password() {
    return this.userForm.get('password');
  }

  get confirmPassword() {
    return this.userForm.get('confirm_password');
  }

}
