import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/auth/_services/auth.service';
import { DecryptService } from 'src/app/shared/services/decrypt/decrypt.service';
import { EntitiesService } from '../../catalog/entities/_services/entities.service';
import { IUserAttributes } from 'src/app/shared/interfaces/user/IUser';
import { MatchValidator } from 'src/app/shared/helpers/MatchValidator';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { RoleService } from 'src/app/dashboard/catalog/role/_services/roles/role.service';
import { Subscription } from 'rxjs';
import { UsersService } from '../../user-management/_services/users.service';
import { IRole, IRoleData } from 'src/app/shared/interfaces/role/IRole';
import { IOrganization, IOrganizationData } from 'src/app/shared/interfaces/organization/IOrganization';
import { TooltipPosition } from '@angular/material/tooltip';
import { EntitiesComponent } from '../../catalog/entities/entities.component';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  isLoading: Boolean = false;
  errorMessage: string = '';
  isRequestLoading: boolean = false;

  profileForm!: FormGroup;

  user!: IUserAttributes;
  userId!: number | string;

  roles!: IRoleData;
  organizations!: IOrganizationData;

  filteredRoles: any;
  filteredResponsibleOrganizations: any;

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];

  subscription: Subscription;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public _authService: AuthService,
    private _roleService: RoleService,
    private _usersService: UsersService,
    private _decryptService: DecryptService,
    private _entitiesServices: EntitiesService,
    private _notificationService: NotificationService,
  ) {
    this.subscription = this.route.params.subscribe((params) => {
      this.userId = this._decryptService.decrypt(params['id']);
    });
    this.getUser();
    this.getRoles();
    this.getOrganizations();
   }

  ngOnInit(): void {
  }

  setUpprofileForm(user: IUserAttributes): void {
    this.profileForm = this.fb.group({
      'name': [user?.name ? user?.name : '', [Validators.required, Validators.minLength(3)]],
      'email': [user?.email ? user?.email : '', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(8)]],
      'confirm_password': ['', [Validators.required]],
      'organization_id': [user?.organization ? user?.organization : '', []],
      'role_id': [user?.role ? user?.role : '', []],
    }, {
      validator: MatchValidator('password', 'confirm_password')
    });
  }



  saveUser(formValue: FormGroup) {

    if(this.profileForm.invalid) {
      return;
    }

    let user: IUserAttributes = {
      'id': '',
      'name': formValue.controls.name.value,
      'password': formValue.controls.password.value,
      'organization_id': !this._authService.isAdmin() ? this._authService.getUserOrganization()['organization']['id'] : null,
      'role_id': JSON.parse(this._authService.getUser())['role']['id'],
    }

    this.isRequestLoading = true;

    this.subscription = this._usersService.updateUser(user, this.userId).subscribe(
      (user) => {
        this.isRequestLoading = false;
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(user?.data));
        this.router.navigate(['/dashboard/profile']);
        this._notificationService.showSuccessNotification('Updated Successfully!', 'Profile has been Updated.');
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
    this.subscription = this._roleService.getAllRoles({page: 1, limit: 20}).subscribe(
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
  getUser() {
    this.isLoading = true;
    this.subscription = this._authService.getCurrentUser().subscribe(
      (user) => {
        this.isLoading = false;
        this.user = user?.data;
        this.setUpprofileForm(this.user);
      },
      (error) => {
        this.isLoading = false;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  private _filter(value: any): any[] {
    let name = value.organization_name || value;

    return this.organizations?.data.filter(option => option.organization_name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  private _filterRole(value: any): any[] {
    let name = value.name || value;

    return this.roles.data.filter(option => option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  get name() {
    return this.profileForm.get('name');
  }

  get email() {
    return this.profileForm.get('email');
  }

  get responsibleOrganization() {
    return this.profileForm.get('organization_id');
  }

  get role() {
    return this.profileForm.get('role_id');
  }

  get password() {
    return this.profileForm.get('password');
  }

  get confirmPassword() {
    return this.profileForm.get('confirm_password');
  }

}
