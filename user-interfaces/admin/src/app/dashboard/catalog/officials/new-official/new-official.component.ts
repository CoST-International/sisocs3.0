import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IOrganizationData } from 'src/app/shared/interfaces/organization/IOrganization';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { EntitiesService } from '../../entities/_services/entities.service';
import { OrganizationUnitService } from '../../organization-units/_services/organization-unit.service';
import { IOffererAttributes } from '../../../../shared/interfaces/offerer/offerer';
import { OfficialsService } from '../_services/officials.service';
import { IOfficialAttributes } from 'src/app/shared/interfaces/official/IOfficial';
import { IOrganizationunitData } from 'src/app/shared/interfaces/organization-unit/IOrganizationunit';

@Component({
  selector: 'app-new-official',
  templateUrl: './new-official.component.html',
  styleUrls: ['./new-official.component.scss']
})
export class NewOfficialComponent implements OnInit {

  errorMessage!: string;
  officialsForm!: FormGroup;
  isRequestLoading: boolean = false;

  subscription!: Subscription;

  organizations!: IOrganizationData;
  organizationUnits!: IOrganizationunitData;
  filteredResponsibleIndividuals: any;
  filteredOrganizationUnits: any;

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _entitiesServices: EntitiesService,
    private _officialService: OfficialsService,
    private _entityUnitService: OrganizationUnitService,
    private _notificationService: NotificationService,
  ) {
    this.getOrganizations();
    this.getAllEntityUnits();
   }

  ngOnInit(): void {
    this.setUpEntityForm();
  }

  setUpEntityForm(): void {
    this.officialsForm = this.fb.group({
      'entity_id': ['', [Validators.required]],
      'entity_unit_id': ['', [Validators.required]],
      'full_name': ['', [Validators.required]],
      'position': ['', ''],
      'email': ['', [Validators.email]],
      'phone': ['', ''],
    })
  }

  getOrganizations() {
    this.isRequestLoading = true;
    this.subscription = this._entitiesServices.getAllEntities({page: 1, limit: 20}).subscribe(
      (entities) => {
        this.isRequestLoading = false;
        this.organizations = entities;

        this.filteredResponsibleIndividuals = this.officialsForm.get('entity_id')?.valueChanges
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

  getAllEntityUnits() {
    let params = {
      q: 'all'
    }
    this.isRequestLoading = true;
    this.subscription = this._entityUnitService.getAllEntityUnits(params).subscribe(
      (units) => {
        this.isRequestLoading = false;
        this.organizationUnits = units;
        this.filteredOrganizationUnits = this.officialsForm.get('entity_unit_id')?.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filterUnits(value))
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

  private _filterUnits(value: any): any[] {
    let name = value.name || value;

    return this.organizationUnits?.data.filter(option => option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayState(state: any) {
    return state ? state.organization_name : '';
  }

  displayStateUnit(state: any) {
    return state ? state.name : '';
  }

  saveOfficial(formValue: FormGroup): void {

    if(this.officialsForm.invalid) {
      return;
    }

    let official: IOfficialAttributes = {
      'id': '',
      'official_name': formValue.controls.full_name.value,
      'position': formValue.controls.position.value,
      'email': formValue.controls.email.value,
      'phone': formValue.controls.phone.value,
      'organization_id': formValue.controls.entity_id.value.id,
      'organization_unit_id': formValue.controls.entity_unit_id.value.id,
    }

    this.isRequestLoading = true;

    this.subscription = this._officialService.addOfficial(official).subscribe(
      (official) => {
        this.isRequestLoading = false;
        this._notificationService.showSuccessNotification('Saved Successfully!', 'Entity Unit has been saved.');
        this.router.navigate(['/dashboard/catalog/officials']);
      },
      (error) => {
        this.isRequestLoading = false;
      }
    )
  }

  get entityUnitName() {
    return this.officialsForm.get('entity_unit_id');
  }

  get entityName() {
    return this.officialsForm.get('entity_id');
  }

  get officialName() {
    return this.officialsForm.get('full_name');
  }

}
