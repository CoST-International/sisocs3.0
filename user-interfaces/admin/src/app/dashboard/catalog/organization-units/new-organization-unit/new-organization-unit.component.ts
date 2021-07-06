import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IOrganizationunitAttributes } from 'src/app/shared/interfaces/organization-unit/IOrganizationunit';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { OrganizationUnitService } from '../_services/organization-unit.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IOrganizationData } from 'src/app/shared/interfaces/organization/IOrganization';
import { EntitiesService } from '../../entities/_services/entities.service';
import { map, startWith } from 'rxjs/operators';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-new-organization-unit',
  templateUrl: './new-organization-unit.component.html',
  styleUrls: ['./new-organization-unit.component.scss']
})
export class NewOrganizationUnitComponent implements OnInit {

  errorMessage!: string;
  entityUnitForm!: FormGroup;
  isRequestLoading: boolean = false;

  subscription!: Subscription;

  organizations!: IOrganizationData;
  filteredResponsibleIndividuals: any;

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _entitiesServices: EntitiesService,
    private _entityUnitService: OrganizationUnitService,
    private _notificationService: NotificationService,
  ) {
    this.getOrganizations();
   }

  ngOnInit(): void {
    this.setUpEntityForm();
  }

  setUpEntityForm(): void {
    this.entityUnitForm = this.fb.group({
      'entity_unit_name': ['', [Validators.required]],
      'entity_id': ['', [Validators.required]]
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

  private _filter(value: any): any[] {
    let name = value.organization_name || value;

    return this.organizations?.data.filter(option => option.organization_name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayState(state: any) {
    return state ? state.organization_name : '';
  }

  saveEntityUnit(formValue: FormGroup): void {

    if(this.entityUnitForm.invalid) {
      return;
    }

    let entityUnit: IOrganizationunitAttributes = {
      'id': '',
      'name': formValue.controls.entity_unit_name.value,
      'organization_id': formValue.controls.entity_id.value.id,
    }

    this.isRequestLoading = true;

    this.subscription = this._entityUnitService.addEntityUnit(entityUnit).subscribe(
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
