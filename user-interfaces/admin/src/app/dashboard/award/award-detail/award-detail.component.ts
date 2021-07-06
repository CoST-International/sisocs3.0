import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AwardService } from '../_services/award.service';
import { DecryptService } from 'src/app/shared/services/decrypt/decrypt.service';
import { IAwardAttributes } from 'src/app/shared/interfaces/award/IAward';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.baseUrl;

@Component({
  selector: 'app-award-detail',
  templateUrl: './award-detail.component.html',
  styleUrls: ['./award-detail.component.scss']
})
export class AwardDetailComponent  implements OnDestroy {

  isLoading: Boolean = false;
  isRequestLoading: Boolean = false;
  errorMessage: string = '';

  subscription: Subscription;
  awardId!: number | string;
  award!: IAwardAttributes;

  constructor(
    private route: ActivatedRoute,
    private _awardService: AwardService,
    private _decryptService: DecryptService,
  ) {
    this.subscription = this.route.params.subscribe((params) => {
      this.awardId = this._decryptService.decrypt(params['id']);
    });

    this.getAwardById(this.awardId);
   }

   getAwardById(id: number | string) {
    this.isRequestLoading = true;
    this.subscription = this._awardService.getAwardById(id).subscribe(
      (award) => {
        this.isRequestLoading = false;
        this.award = award.data;
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
