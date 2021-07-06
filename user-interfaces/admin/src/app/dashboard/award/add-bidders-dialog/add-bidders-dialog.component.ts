import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IQueryparam } from 'src/app/shared/interfaces/queryparam/IQueryparam';
import { OfferersService } from 'src/app/shared/services/offerers/offerers.service';
import { TenderOffererService } from 'src/app/shared/services/tender-offerer/tender-offerer.service';
import { IOfferer, IOffererData, IOffererAttributes } from '../../../shared/interfaces/offerer/offerer';
import { ITenderOffererAttributes } from '../../../shared/interfaces/tender-offerer/TenderOfferer';
import { NotificationService } from '../../../shared/services/notifications/notification.service';

@Component({
  selector: 'app-add-bidders-dialog',
  templateUrl: './add-bidders-dialog.component.html',
  styleUrls: ['./add-bidders-dialog.component.scss']
})
export class AddBiddersDialogComponent implements OnInit {

  isLoading: boolean = false;
  biddersForm!: FormGroup;

  bidders!: IOffererData;

  constructor(
    private fb: FormBuilder,
    private _offerService: OfferersService,
    private _notificationService: NotificationService,
    private _tenderOffererService: TenderOffererService,
    public dialogRef: MatDialogRef<AddBiddersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.getAllBidders({ 'q': 'all'});
    }

  ngOnInit(): void {
    this.setUpBidderForm();
  }

  setUpBidderForm() {
    this.biddersForm = this.fb.group({
      offerrer_id: ['', [Validators.required]]
    });
  }

  saveBidder(formValue: FormGroup) {
    this.isLoading = true;

    let bidder: ITenderOffererAttributes = {
      'id': '',
      'offerer_id': formValue.controls.offerrer_id.value,
      'tender_id': this.data.id,
      'status_id': this.data.status_id,
    }

    this._tenderOffererService.addTenderOfferer(bidder).subscribe(
      (source) => {
        this.isLoading = false;
        this._notificationService.showSuccessNotification('Saved Successfully', 'Offerer has been added');
        this.closeDialog();
      },
      (error) => {
        this.isLoading = false;
      }
    )
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getAllBidders(queryParams: IQueryparam): void {
    this.isLoading = false;
    this._offerService.getAllOfferers(queryParams).subscribe(
      (offerers) => {
        this.isLoading = false;
        this.bidders = offerers;
      },
      (error) => {
        this.isLoading = false;
      }
    )
  }

}
