import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EntitiesService } from '../_services/entities.service';
import { IOrganizationAttributes } from '../../../../shared/interfaces/organization/IOrganization';
import { NotificationService } from '../../../../shared/services/notifications/notification.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-entity',
  templateUrl: './new-entity.component.html',
  styleUrls: ['./new-entity.component.scss']
})
export class NewEntityComponent implements OnInit {

  entityForm!: FormGroup;
  isRequestLoading: boolean = false;

  subscription!: Subscription;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _entityService: EntitiesService,
    private _notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.setUpEntityForm();
  }

  setUpEntityForm(): void {
    this.entityForm = this.fb.group({
      'identifier': ['', [Validators.required]],
      'entity_name': ['', [Validators.required]],
      'entity_legal_name': ['', [Validators.required]],
      'website': ['', null],
      'description': ['', null],
      'direction': ['', null],
      'telephone': ['', null],
    })
  }

  saveEntity(formValue: FormGroup): void {

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

    this.subscription = this._entityService.addEntity(entity).subscribe(
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
