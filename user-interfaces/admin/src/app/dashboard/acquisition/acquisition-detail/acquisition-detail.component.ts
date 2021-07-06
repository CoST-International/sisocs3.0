import { Component, OnDestroy, OnInit } from '@angular/core';

import { AcquisitionsService } from '../_services/acquisitions.service';
import { ActivatedRoute } from '@angular/router';
import { DecryptService } from 'src/app/shared/services/decrypt/decrypt.service';
import { ITenderAttributes } from 'src/app/shared/interfaces/tender/ITender';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.baseUrl;

@Component({
  selector: 'app-acquisition-detail',
  templateUrl: './acquisition-detail.component.html',
  styleUrls: ['./acquisition-detail.component.scss']
})
export class AcquisitionDetailComponent  implements OnDestroy {

  isLoading: Boolean = false;
  isRequestLoading: Boolean = false;
  errorMessage: string = '';

  subscription: Subscription;
  tenderId!: number | string;
  tender!: ITenderAttributes;

  constructor(
    private route: ActivatedRoute,
    private _decryptService: DecryptService,
    private _tenderService: AcquisitionsService,
  ) {
    this.subscription = this.route.params.subscribe((params) => {
      this.tenderId = this._decryptService.decrypt(params['id']);
    });

    this.getTenderById(this.tenderId);
   }

   getTenderById(id: number | string) {
    this.isRequestLoading = true;
    this.subscription = this._tenderService.getTenderById(id).subscribe(
      (tender) => {
        this.isRequestLoading = false;
        this.tender = tender.data;
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
