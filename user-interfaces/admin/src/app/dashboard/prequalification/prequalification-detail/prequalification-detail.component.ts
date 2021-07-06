import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { DecryptService } from 'src/app/shared/services/decrypt/decrypt.service';
import { IPrequalificationAttributes } from '../../../shared/interfaces/prequalification/IPrequalification';
import { OnDestroy } from '@angular/core';
import { PrequalificationService } from '../_services/prequalification.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.baseUrl;

@Component({
  selector: 'app-prequalification-detail',
  templateUrl: './prequalification-detail.component.html',
  styleUrls: ['./prequalification-detail.component.scss']
})
export class PrequalificationDetailComponent implements OnInit, OnDestroy {

  isLoading: Boolean = false;
  isRequestLoading: Boolean = false;
  errorMessage: string = '';

  subscription: Subscription;
  prequalificationId!: number | string;
  prequalification!: IPrequalificationAttributes;

  constructor(
    private route: ActivatedRoute,
    private _prequalificationService: PrequalificationService,
    private _decryptService: DecryptService,
  ) {
    this.subscription = this.route.params.subscribe((params) => {
      this.prequalificationId = this._decryptService.decrypt(params['id']);
    });

    this.getPrequalification(this.prequalificationId);
   }

  ngOnInit(): void {
  }

  getPrequalification(id: number | string) {
    this.isRequestLoading = true;
    this.subscription = this._prequalificationService.getPrequalificationById(id).subscribe(
      (prequalification) => {
        this.isRequestLoading = false;
        this.prequalification = prequalification.data;
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
