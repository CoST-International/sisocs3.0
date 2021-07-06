import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecryptService } from 'src/app/shared/services/decrypt/decrypt.service';
import { IOrganizationAttributes, IOrganizationData } from 'src/app/shared/interfaces/organization/IOrganization';
import { IOrganizationunit, IOrganizationunitAttributes } from 'src/app/shared/interfaces/organization-unit/IOrganizationunit';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { EntitiesService } from '../../entities/_services/entities.service';
import { OrganizationUnitService } from '../_services/organization-unit.service';

@Component({
  selector: 'app-edit-organization-unit',
  templateUrl: './edit-organization-unit.component.html',
  styleUrls: ['./edit-organization-unit.component.scss']
})
export class EditOrganizationUnitComponent implements OnInit {

  errorMessage!: string;
  entityUnitForm!: FormGroup;
  isRequestLoading: boolean = false;

  subscription!: Subscription;

  organizations!: IOrganizationData;
  filteredResponsibleIndividuals: any;

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];

  entityUnitId!: number | string;
  entityUnit!: IOrganizationunit;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _decryptService: DecryptService,
    private _entitiesServices: EntitiesService,
    private _entityUnitService: OrganizationUnitService,
    private _notificationService: NotificationService,
  ) {
    this.subscription = this.route.params.subscribe((params) => {
      this.entityUnitId = this._decryptService.decrypt(params['id']);
    });

    this.getEntityUnitById(this.entityUnitId);
    this.getOrganizations();
   }

  ngOnInit(): void {

  }

  setUpEntityForm(entityUnit: IOrganizationunitAttributes): void {
    this.entityUnitForm = this.fb.group({
      'entity_unit_name': [entityUnit?.name ? entityUnit?.name : '', [Validators.required]],
      'entity_id': [entityUnit?.organization ? entityUnit?.organization : '', [Validators.required]]
    })
  }

  getOrganizations() {
    this.isRequestLoading = true;
    this.subscription = this._entitiesServices.getAllEntities({page: 1, limit: 20}).subscribe(
      (entities) => {
        this.isRequestLoading = false;
        this.organizations = entities;

        this.filteredResponsibleIndividuals = this.entityUnitForm.get('entity_id')?.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
      },
      (error) => {
        this.isRequestLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }

  getEntityUnitById(id: string | number): void {
    this.isRequestLoading = true;
    this.subscription = this._entityUnitService.getEntityUnitById(id).subscribe(
      (entityUnit) => {
        this.isRequestLoading = false;
        this.entityUnit = entityUnit;
        this.setUpEntityForm(this.entityUnit?.data);
      },
      (error) => {
        this.isRequestLoading = false;
      }
    )
  }

  private _filter(value: any): any[] {
    let name = value.organization_name || value;

    return this.organizations?.data.filter(option => option.organization_name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayState(state: any) {
    return state ? state.organization_name : '';
  }

  updateEntityUnit(formValue: FormGroup): void {

    if(this.entityUnitForm.invalid) {
      return;
    }

    let entityUnit: IOrganizationunitAttributes = {
      'id': '',
      'name': formValue.controls.entity_unit_name.value,
      'organization_id': formValue.controls.entity_id.value.id,
    }

    this.isRequestLoading = true;

    this.subscription = this._entityUnitService.updateEntityUnit(entityUnit, this.entityUnitId).subscribe(
      (entityUnit) => {
        this.isRequestLoading = false;
        this._notificationService.showSuccessNotification('Saved Successfully!', 'Entity Unit has been saved.');
        this.router.navigate(['/catalog/organization-units']);
      },
      (error) => {
        this.isRequestLoading = false;
      }
    )
  }

  get entityUnitName() {
    return this.entityUnitForm.get('entity_unit_name');
  }

  get entityLegalName() {
    return this.entityUnitForm.get('entity_id');
  }


}
