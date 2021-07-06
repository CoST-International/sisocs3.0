import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { MatchValidator } from 'src/app/shared/helpers/MatchValidator';
import { IOrganization, IOrganizationData } from 'src/app/shared/interfaces/organization/IOrganization';
import { IRole, IRoleData } from 'src/app/shared/interfaces/role/IRole';
import { IUserAttributes } from 'src/app/shared/interfaces/user/IUser';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { RoleService } from 'src/app/dashboard/catalog/role/_services/roles/role.service';
import { EntitiesService } from '../../catalog/entities/_services/entities.service';
import { DecryptService } from 'src/app/shared/services/decrypt/decrypt.service';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  isLoading!: boolean;
  isRequestLoading: boolean = false;
  errorMessage: string = '';

  userForm!: FormGroup;

  user!: IUserAttributes;
  userId!: number | string;
  roles!: IRoleData;
  organizations!: IOrganizationData;

  filteredRoles: any;
  filteredResponsibleOrganizations: any;

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];

  subscription!: Subscription;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _usersService: UsersService,
    private _authService: AuthService,
    private _roleService: RoleService,
    private _decryptService: DecryptService,
    private _entitiesServices: EntitiesService,
    private _notificationService: NotificationService,
  ) {

    this.subscription = this.route.params.subscribe((params) => {
      this.userId = this._decryptService.decrypt(params['id']);
    });

    this.getUserById(this.userId);
    this.getRoles();
    this.getOrganizations();
  }

  ngOnInit(): void {
  }

  setUpUserForm(user: IUserAttributes): void {
    this.userForm = this.fb.group({
      'name': [user?.name ? user?.name : '', [Validators.required, Validators.minLength(3)]],
      'email': [user?.email ? user?.email : '', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(8)]],
      'confirm_password': ['', [Validators.required]],
      'organization_id': [user?.organization ? user?.organization : '', [Validators.required]],
      'role_id': [user?.role ? user?.role : '', [Validators.required]],
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
      // 'email': formValue.controls.email.value,
      'password': formValue.controls.password.value,
      'role_id': formValue.controls.role_id.value.id,
      'organization_id': formValue.controls.organization_id.value.id,
    }

    this.isRequestLoading = true;

    this.subscription = this._usersService.updateUser(user, this.userId).subscribe(
      (user) => {
        this.isRequestLoading = false;
        this.router.navigate(['/dashboard/user-management']);
        this._notificationService.showSuccessNotification('Updated Successfully!', 'User has been Updated.');
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
        this.roles = roles;

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

  getUserById(id: string | number): void {
    this.isLoading = true;
    this.subscription = this._usersService.getUserById(id).subscribe(
      (user) => {
        this.isLoading = false;
        this.user = user.data;
        this.setUpUserForm(this.user);
      },
      (error) => {
        this.isLoading = false;
      }
    )
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

    return this.organizations.data.filter(option => option.organization_name.toLowerCase().indexOf(name.toLowerCase()) === 0);
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
