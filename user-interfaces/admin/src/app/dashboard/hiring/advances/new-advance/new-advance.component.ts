import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

import { AddDocumentDialogComponent } from 'src/app/shared/dialogs/add-document-dialog/add-document-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ProjectService } from 'src/app/dashboard/project/_services/project.service';
import { environment } from 'src/environments/environment';
import { IQueryparam } from 'src/app/shared/interfaces/queryparam/IQueryparam';
import { ContractService } from '../../contract/_services/contract.service';
import { IContractAttributes, IContractData } from 'src/app/shared/interfaces/contract/IContract';
import { CurrencyService } from 'src/app/shared/services/currency/currency.service';
import { Subscription } from 'rxjs';
import { ICurrency } from 'src/app/shared/interfaces/currency/ICurrency';
import { IAdvance, IAdvanceAttributes } from 'src/app/shared/interfaces/advance/IAdvance';
import { AdvancesService } from '../_services/advances.service';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';

@Component({
  selector: 'app-new-advance',
  templateUrl: './new-advance.component.html',
  styleUrls: ['./new-advance.component.scss']
})
export class NewAdvanceComponent implements OnInit {

  apiUrl = environment.apiUrl

  isRequestLoading: boolean = false;
  isLoading!: boolean;
  errorMessage: string = '';

  projects = [];
  contracts!: IContractData;


  advanceForm!: FormGroup;
  documentFormStep!: FormGroup;

  filteredProjects: any;
  filteredContracts: any;

  statuses = [
    {
      id: 1,
      title: 'Contract'
    },
    {
      id: 2,
      title: 'Cancelled'
    }
  ];

  currencies!: ICurrency;
  selectedContract!: IContractAttributes;
  savedAdvanceInfo!: IAdvance;

  subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _projectService: ProjectService,
    private _advanceService: AdvancesService,
    private _currencyService: CurrencyService,
    private _contractService: ContractService,
    private _notificationService: NotificationService,
  ) {
    this.getAllContracts({ 'q': 'all', 'relation': 'project' });
    this.getCurrencies();
  }

  ngOnInit(): void {
    this.setUpAdvanceForm();
  }



  setUpAdvanceForm(): void {
    this.advanceForm = this.fb.group({
      'contract_id': ['', [Validators.required]], // Validators.required
      'advance_date': ['', []], // Validators.required
      'currency': ['', [Validators.required]], // Validators.required
      'payment': ['', [Validators.required]], // Validators.required
      'description': ['', [Validators.required]], // Validators.required
      'problem_description': ['', []], // Validators.required
    });

    this.filteredProjects = this.advanceForm.get('project_id')?.valueChanges
      .pipe(
        startWith(null),
        map(state => state ? this._filter(state) : this.projects.slice())
      );

  }


  openDocumentDialog() {
    const dialogRef = this.dialog.open(AddDocumentDialogComponent, {
      width: '600px',
      height: '908px',
      data: {name: 'name', animal: 'animal'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  getAllProjects(url: string, queryAll: string) {

    // url = `${this.apiUrl}/projects`
    // this.isLoading = true;
    // this._projectService.getAllProjects(url, 'all').subscribe(
    //   (projects) => {
    //     this.isLoading = false;
    //     this.projects = projects;
    //     console.log('Projects ', this.projects);
    //     this.setUpProjectForm();
    //   },
    //   error => this.errorMessage = <any>error
    // );
  }

  getAllContracts(queryParam: IQueryparam) {
    this.isLoading = true;
    this._contractService.getAllContracts(queryParam).subscribe(
      (contracts) => {
        this.isLoading = false;
        this.contracts = contracts;
        this.filteredContracts = this.contract?.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
        console.log('Contracts ', this.contracts);
      },
      (error) => {
        this.errorMessage = <any>error;
        // this._notificationService.showErrorNotification('Error preparation', this.errorMessage);
      }
    );
  }

  getProjectDetails(contract: IContractAttributes) {
    this.selectedContract = contract;
  }

  getCurrencies() {
    this.isLoading = true;
    this.subscription = this._currencyService.getAllCurrencies({page: 1, limit: 20}).subscribe(
      (currencies) => {
        this.isLoading = false;
        this.currencies = currencies;
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }

  saveAdvance(formValue: FormGroup, stepper: MatStepper) {
    if(this.advanceForm.invalid) {
      return;
    }

    let advance: IAdvanceAttributes = {
      'id': '',
      'contract_id': formValue.controls.contract_id.value.id,
      'project_id': formValue.controls.contract_id.value.project.id,
      'advance_date': formValue.controls.advance_date.value,
      'currency_id': +formValue.controls.currency.value,
      'payment': formValue.controls.payment.value,
      'description': formValue.controls.description.value,
      'problem_description': formValue.controls.problem_description.value,
      'ocds_id': this.selectedContract?.ocds_id
    }

    console.log('Advance ', advance);

    // this.isRequestLoading = true;

    // this.subscription = this._advanceService.addAdvance(advance).subscribe(
    //   (award) => {
    //     this.isRequestLoading = false;
    //     this.savedAdvanceInfo = award;
    //     console.log('Saved Award ', this.savedAdvanceInfo);
    //     this._notificationService.showSuccessNotification('Saved Successfully!', 'Advance has been saved.');
    //     this.nextLocation(stepper);
    //   },
    //   (error) => {
    //     this.isRequestLoading = false;
    //   }
    // )
  }

  nextLocation(stepper: MatStepper) {
    stepper.next();
  }

  displayStateProjects(state: any) {
    return state ? state.process_number_standard : '';
  }

  displayStateModificationTypes(state: any) {
    return state ? state.title : '';
  }

  private _filter(value: any): any[] {
    let project = value.project?.project_name  || value;

    return this.contracts?.data.filter(option => (option.project?.project_name != null ? option.project?.project_name.toLowerCase().indexOf(project.toLowerCase()) === 0 : null));
  }

  get contract() {
    return this.advanceForm.get('contract_id');
  }

  get description() {
    return this.advanceForm.get('description');
  }

  get currency() {
    return this.advanceForm.get('currency_id');
  }

  get payment() {
    return this.advanceForm.get('payment');
  }

}
