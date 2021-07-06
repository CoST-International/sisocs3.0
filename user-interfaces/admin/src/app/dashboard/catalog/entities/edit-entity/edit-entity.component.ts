import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOrganization, IOrganizationAttributes } from '../../../../shared/interfaces/organization/IOrganization';

import { DecryptService } from '../../../../shared/services/decrypt/decrypt.service';
import { EntitiesService } from '../_services/entities.service';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-entity',
  templateUrl: './edit-entity.component.html',
  styleUrls: ['./edit-entity.component.scss']
})
export class EditEntityComponent implements OnInit {

  entityForm!: FormGroup;
  isRequestLoading: boolean = false;

  subscription!: Subscription;

  entityId!: number | string;
  entity!: IOrganization;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _decryptService: DecryptService,
    private _entityService: EntitiesService,
    private _notificationService: NotificationService,
  ) {
    this.subscription = this.route.params.subscribe((params) => {
      this.entityId = this._decryptService.decrypt(params['id']);
    });

    this.getEntityById(this.entityId);
   }

  ngOnInit(): void {

  }

  setUpEntityForm(entity: IOrganizationAttributes): void {
    this.entityForm = this.fb.group({
      'identifier': [entity?.identifier ? entity?.identifier : '', [Validators.required]],
      'entity_name': [entity?.organization_name ? entity?.organization_name : '', [Validators.required]],
      'entity_legal_name': [entity?.organization_legal_name ? entity?.organization_legal_name : '', [Validators.required]],
      'website': [entity?.website ? entity?.website : '', null],
      'description': [entity?.description ? entity?.description : '', null],
      'direction': [entity?.direction ? entity?.direction : '', null],
      'telephone': [entity?.telephone ? entity?.telephone : '', null],
    })
  }

  updateEntity(formValue: FormGroup): void {

    if(this.entityForm.invalid) {
      return;
    }

    let entity: IOrganizationAttributes = {
      'id': '',
      'code': '',
      'identifier': formValue.controls.identifier.value,
      'organization_name': formValue.controls.entity_name.value,
      'organization_legal_name': formValue.controls.entity_legal_name.value,
      'description': formValue.controls.description.value,
      'website': formValue.controls.website.value,
    }

    this.isRequestLoading = true;

    this.subscription = this._entityService.updateEntity(entity, this.entityId).subscribe(
      (entity) => {
        this.isRequestLoading = false;
        this._notificationService.showSuccessNotification('Saved Successfully!', 'Entity has been saved.');
        this.router.navigate(['/dashboard/catalog/entities']);
      },
      (error) => {
        this.isRequestLoading = false;
      }
    )
  }

  getEntityById(id: string | number): void {
    this.isRequestLoading = true;
    this.subscription = this._entityService.getEntityById(id).subscribe(
      (entity) => {
        this.isRequestLoading = false;
        this.entity = entity;
        console.log('Entity ', this.entity);
        this.setUpEntityForm(this.entity?.data);
      },
      (error) => {
        this.isRequestLoading = false;
      }
    )
  }

  get identifier() {
    return this.entityForm.get('identifier');
  }

  get entityName() {
    return this.entityForm.get('entity_name');
  }

  get entityLegalName() {
    return this.entityForm.get('entity_legal_name');
  }

}
