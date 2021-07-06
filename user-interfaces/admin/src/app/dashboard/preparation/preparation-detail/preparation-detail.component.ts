import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { DecryptService } from 'src/app/shared/services/decrypt/decrypt.service';
import { IPreparationAttributes } from 'src/app/shared/interfaces/preparation/IPreparation';
import { IProjectAttributes } from 'src/app/shared/interfaces/project/IProject';
import { PreparationService } from '../_services/preparation.service';
import { ProjectService } from '../../project/_services/project.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.baseUrl;

@Component({
  selector: 'app-preparation-detail',
  templateUrl: './preparation-detail.component.html',
  styleUrls: ['./preparation-detail.component.scss']
})
export class PreparationDetailComponent implements OnInit, OnDestroy {

  isLoading: Boolean = false;
  isRequestLoading: Boolean = false;
  errorMessage: string = '';

  subscription: Subscription;
  preparationId!: number | string;
  preparation!: IPreparationAttributes;

  constructor(
    private route: ActivatedRoute,
    private _preparationService: PreparationService,
    private _decryptService: DecryptService,
  ) {
    this.subscription = this.route.params.subscribe((params) => {
      this.preparationId = this._decryptService.decrypt(params['id']);
    });

    this.getPreparation(this.preparationId);
   }

  ngOnInit(): void {
  }

  getPreparation(id: number | string) {
    this.isRequestLoading = true;
    this.subscription = this._preparationService.getPreparationById(id).subscribe(
      (preparation) => {
        this.isRequestLoading = false;
        this.preparation = preparation.data;
      },
      (error) => {
        this.isRequestLoading = false;
      }
    )
  }

  downloadDocument(url: string) {
    window.open(`${apiUrl}${url}`, '_blank');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
