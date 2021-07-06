import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { IOfficial, IOfficialAttributes } from 'src/app/shared/interfaces/official/IOfficial';
import { IOrganizationunitData } from 'src/app/shared/interfaces/organization-unit/IOrganizationunit';
import { IOrganizationData } from 'src/app/shared/interfaces/organization/IOrganization';
import { DecryptService } from 'src/app/shared/services/decrypt/decrypt.service';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { EntitiesService } from '../../entities/_services/entities.service';
import { OrganizationUnitService } from '../../organization-units/_services/organization-unit.service';
import { OfficialsService } from '../_services/officials.service';

@Component({
  selector: 'app-edit-official',
  templateUrl: './edit-official.component.html',
  styleUrls: ['./edit-official.component.scss']
})
export class EditOfficialComponent implements OnInit {

  errorMessage!: string;
  officialsForm!: FormGroup;
  isRequestLoading: boolean = false;

  subscription!: Subscription;

  official!: IOfficial;
  organizations!: IOrganizationData;
  organizationUnits!: IOrganizationunitData;
  filteredResponsibleIndividuals: any;
  filteredOrganizationUnits: any;

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];

  officialId!: number | string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _decryptService: DecryptService,
    private _entitiesServices: EntitiesService,
    private _officialService: OfficialsService,
    private _entityUnitService: OrganizationUnitService,
    private _notificationService: NotificationService,
  ) {
    this.subscription = this.route.params.subscribe((params) => {
      this.officialId = this._decryptService.decrypt(params['id']);
    });

    this.getOfficialById(this.officialId);
    this.getOrganizations();
    this.getAllEntityUnits();
   }

  ngOnInit(): void {
  }

  setUpEntityForm(official: IOfficialAttributes): void {
    this.officialsForm = this.fb.group({
      'entity_id': [official?.organization ? official?.organization : '', [Validators.required]],
      'entity_unit_id': [official?.organizationUnit ? official?.organizationUnit : '', [Validators.required]],
      'full_name': [official?.official_name ? official?.official_name : '', [Validators.required]],
      'position': [official?.position ? official?.position : '', ''],
      'email': [official?.email ? official?.email : '', [Validators.email]],
      'phone': [official?.phone ? official?.phone : '', ''],
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

  getOfficialById(id: number | string): void {
    this.isRequestLoading = true;
    this.subscription = this._officialService.getOfficialById(id).subscribe(
      (official) => {
        this.isRequestLoading = false;
        this.official = official;
        this.setUpEntityForm(this.official.data);
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

  updateOfficial(formValue: FormGroup): void {

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

    this.subscription = this._officialService.updateOfficial(official, this.officialId).subscribe(
      (official) => {
        this.isRequestLoading = false;
        this._notificationService.showSuccessNotification('Updated Successfully!', 'Official\'s Information has been updated.');
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
