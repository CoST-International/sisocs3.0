import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FinancingSourceService } from 'src/app/dashboard/catalog/financing-source/_services/financing-source.service';
import { ICurrency } from '../../interfaces/currency/ICurrency';
import { CurrencyService } from '../../services/currency/currency.service';
import { IFundingsource } from 'src/app/shared/interfaces/funding-source/IFundingsource';
import { IProjectFundingSourceAttributes } from 'src/app/shared/interfaces/project-funding-source/IProjectfundingsource';
import { ProjectFundingSourceService } from 'src/app/dashboard/catalog/financing-source/_services/project-funding-source/project-funding-source.service';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { IPreparationAttributes } from 'src/app/shared/interfaces/preparation/IPreparation';

@Component({
  selector: 'app-add-funding-sources',
  templateUrl: './add-funding-sources.component.html',
  styleUrls: ['./add-funding-sources.component.scss']
})
export class AddFundingSourcesComponent implements OnInit {

  isLoading: boolean = false;

  fundingSourceForm!: FormGroup;

  filteredCurrencies: any;
  filteredFundingSources: any;

  currencies!: ICurrency;
  fundingSources!: IFundingsource

  subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private _currencyService: CurrencyService,
    private _notificationService: NotificationService,
    private _fundingSourceService: FinancingSourceService,
    private _projectFundingSourceService: ProjectFundingSourceService,
    public dialogRef: MatDialogRef<AddFundingSourcesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPreparationAttributes) {
      this.getFundingSources();
      this.getCurrencies();
    }

  ngOnInit(): void {
    this.setUpfundingSourceForm();
  }
  private _filterFountains(value: any): any[]  {
    let title = value.name || value;

    return this.fundingSources.data.filter(option => option.name.toLowerCase().indexOf(title.toLowerCase()) === 0);
}

  setUpfundingSourceForm(): void {
    this.fundingSourceForm = this.fb.group({
      'funding_source_id': ['', [Validators.required]],
      'currency_id': ['', [Validators.required]],
      'amount': ['', [Validators.required]],
    });
  }

  getCurrencies() {
    this.isLoading = true;
    this.subscription = this._currencyService.getAllCurrencies({page: 1, limit: 20}).subscribe(
      (currencies) => {
        this.isLoading = false;
        this.currencies = currencies;
        this.filteredCurrencies = this.currency?.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filterCurrencies(value))
          );
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  getFundingSources() {
    this.isLoading = true;
    this.subscription = this._fundingSourceService.getAllFundingSources({page: 1, limit: 20}).subscribe(
      (sources) => {
        this.isLoading = false;
        this.fundingSources = sources;
        this.filteredFundingSources = this.fundingSource?.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterFountains(value))
        );
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  private _filterCurrencies(value: any): any[] {
    let title = value.code || value;
    return this.currencies?.data.filter(option => (option.code != null ? option.code.toLowerCase().indexOf(title.toLowerCase()) === 0 : null));
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveFundingSource(formValue: FormGroup) {
    this.isLoading = true;

    let projectFundingSource: IProjectFundingSourceAttributes = {
      'id': '',
      'amount': formValue.controls.amount.value,
      // 'exchange_rate': formValue.controls.amount.value,
      'project_id': this.data.project_id,
      'funding_source_id': formValue.controls.funding_source_id.value.id,
      'currency_id': formValue.controls.currency_id.value.id,
      'status_id': this.data.status_id,
    }

    this._projectFundingSourceService.addProjectFundingSources(projectFundingSource).subscribe(
      (source) => {
        this.isLoading = false;
        this._notificationService.showSuccessNotification('Saved Successfully', 'Project Funding Source has been added');
        this.closeDialog();
      },
      (error) => {
        this.isLoading = false;
      }
    )
  }

  displayStateFundingSources(state: any) {
    return state ? state.name : '';
  }

  displayStateCurrencies(state: any) {
    return state ? state.code : '';
  }

  get currency() {
    return this.fundingSourceForm.get('currency_id');
  }

  get fundingSource() {
    return this.fundingSourceForm.get('funding_source_id');
  }

  get amount() {
    return this.fundingSourceForm.get('amount');
  }

}
