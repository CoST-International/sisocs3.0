import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { DocumentService } from 'src/app/dashboard/documents/_services/document.service';
import { ProjectService } from 'src/app/dashboard/project/_services/project.service';
import { AddDocumentDialogComponent } from 'src/app/shared/dialogs/add-document-dialog/add-document-dialog.component';
import { IAddendum, IAddendumAttributes } from 'src/app/shared/interfaces/addendum/IAddendum';
import { IContractData } from 'src/app/shared/interfaces/contract/IContract';
import { ICurrency } from 'src/app/shared/interfaces/currency/ICurrency';
import { IDocumentData } from 'src/app/shared/interfaces/documents/IDocument';
import { IProjectData } from 'src/app/shared/interfaces/project/IProject';
import { IQueryparam } from 'src/app/shared/interfaces/queryparam/IQueryparam';
import { CurrencyService } from 'src/app/shared/services/currency/currency.service';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { environment } from 'src/environments/environment';
import { ContractService } from '../../contract/_services/contract.service';
import { AddendaService } from '../_services/addenda.service';
import { StandadStatusesService } from '../../../../shared/services/standard-status/standad-statuses.service';
import { IStandardstatusAttributes } from 'src/app/shared/interfaces/standardstatus/IStandardstatus';
import { ActivatedRoute } from '@angular/router';
import { DecryptService } from 'src/app/shared/services/decrypt/decrypt.service';

@Component({
  selector: 'app-edit-addendum',
  templateUrl: './edit-addendum.component.html',
  styleUrls: ['./edit-addendum.component.scss']
})
export class EditAddendumComponent {

  apiUrl = environment.apiUrl

  isLoading!: boolean;
  isRequestLoading: boolean = false;
  errorMessage: string = '';

  addendumForm!: FormGroup;
  documentFormStep!: FormGroup;

  documents!: IDocumentData;
  contracts!: IContractData;
  selectedProject!: IProjectData;
  standardStatuses!: IStandardstatusAttributes[];

  filteredProjects: any;
  filteredStatuses: any;
  filteredContracts: any;
  filteredModificationTypes: any;

  statuses = [
    { id: 1, title: 'BORRADOR' },
    { id: 2, title: 'PUBLICADO' },
    { id: 3, title: 'REVISIÓN' },
    { id: 4, title: 'No Definido' },
  ];

  currencies!: ICurrency;

  modificationTypes = [
    {
      id: 1,
      title: 'Cambio duración del contrato'
    },
    {
      id: 1,
      title: 'Cambio de precio'
    },
    {
      id: 1,
      title: 'Cambio de alcance del contrato'
    },
    {
      id: 1,
      title: 'Cambio programa de trabajo'
    },
    {
      id: 1,
      title: 'orden de cambio'
    },
    {
      id: 1,
      title: 'previa Firma de Addenda'
    },
  ];

  subscription!: Subscription;

  addendumId!: number | string;
  addendum!: IAddendumAttributes;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public _authService: AuthService,
    private _decryptService: DecryptService,
    private _addendaService: AddendaService,
    private _projectService: ProjectService,
    private _currencyService: CurrencyService,
    private _contractService: ContractService,
    private _documentService: DocumentService,
    private _notificationService: NotificationService,
    private _standardStatusesService: StandadStatusesService,
  ) {
    this.subscription = this.route.params.subscribe((params) => {
      this.addendumId = this._decryptService.decrypt(params['id']);
    });
    this.getAddendumById(this.addendumId);
   }

  setUpAddendumForm(addendum: IAddendumAttributes): void {
    this.addendumForm = this.fb.group({
      'contract_id': [addendum?.contract ? addendum?.contract : '', [Validators.required]],
      'modification_date': [addendum?.date ? addendum?.date : '', []],
      'justification': [addendum?.justification ? addendum?.justification : '', []],
      'scope': [addendum?.current_contract_scope ? addendum?.current_contract_scope : '', []],
      'contract_end_date': [addendum?.contract_date ? addendum?.contract_date : '', []],
      'currency_id': [addendum?.currency_id ? addendum?.currency_id : '', [Validators.required]],
      'updated_contract_price': [addendum?.contract_price ? addendum?.contract_price : '', [Validators.required]],
      'modification_type': [addendum?.modification_type ? addendum?.modification_type : '', [Validators.required]],
      'status_id': [(this._authService.isPublisher()) ? this.statuses[0].id : addendum?.status_id ? addendum?.status_id : '', (!this._authService.isPublisher()) ? [Validators.required] : '']
    });
  }


  openDocumentDialog() {
    const dialogRef = this.dialog.open(AddDocumentDialogComponent, {
      width: '600px',
      height: '908px',
      data: { id: this.addendum.contract?.project_id, section_id: 12 }
    });

    dialogRef.afterClosed().subscribe(result => {
    this.getAllDocuments({ 'projectID': this.addendum.contract?.project_id, 'section': 12 });
    });
  }

  getAddendumById(id: string | number): void {
    this.isLoading = true;
    this.subscription = this._addendaService.getAddendumById(id).subscribe(
      (addendum) => {
        this.isLoading = false;
        this.addendum = addendum.data;
        console.log('Addendum Details ', this.addendum);
        this.setUpAddendumForm(this.addendum);
        this.getAllContracts({ 'q': 'all', 'relation': 'project' });
        this.getCurrencies();
      },
      (error) => {
        this.isLoading = false;
      }
    )
  }

  saveAddendum(formValue: FormGroup, stepper: MatStepper) {

    if(this.addendumForm.invalid) {
      return;
    }

    let addendum: IAddendumAttributes = {
      'id': '',
      'status_id': !this._authService.isPublisher() ? formValue.controls.status_id.value : this.statuses[0].id,
      'modification_type': formValue.controls.modification_type.value,
      'justification': formValue.controls.justification.value,
      'contract_price': formValue.controls.updated_contract_price.value,
      'currency_id': formValue.controls.currency_id.value,
      'current_contract_scope': formValue.controls.scope.value,
      'date': formValue.controls.modification_date.value,
      'contract_date': formValue.controls.contract_end_date.value,
      'contract_id': formValue.controls.contract_id.value.id,
    }

    console.log('Addendum Data ', addendum);

    this.isRequestLoading = true;


    this.subscription = this._addendaService.updateAddendum(addendum, this.addendumId).subscribe(
      (addendum) => {
        this.isRequestLoading = false;
        this._notificationService.showSuccessNotification('Saved Successfully!', 'Preparation has been saved.');
        this.getAllDocuments({ 'projectID': this.addendum.contract?.project_id, 'section': 12 });
        this.nextLocation(stepper);
      },
      (error) => {
        this.isRequestLoading = false;
      }
    )
  }

  nextLocation(stepper: MatStepper) {
    stepper.next();
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
        this.getStatuses();
        console.log('Contracts ', this.contracts);
      },
      (error) => {
        this.errorMessage = <any>error;
        // this._notificationService.showErrorNotification('Error preparation', this.errorMessage);
      }
    );
  }

  getStatuses() {
    this.filteredStatuses = this.status?.valueChanges.pipe(
      startWith(''),
      map(value => this._filterStatus(value))
    );
  }

  getAllDocuments(query: IQueryparam): void {
    this.isLoading = true;
    this.subscription = this._documentService.getAllDocuments(query).subscribe(
      (documents) => {
        this.isLoading = false;
        this.documents = documents
        console.log('Documents', this.documents);
      },
      (error) => {

      }
    )
  };

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

  getStandardStatuses(section: number | string) {
    this.isLoading = true;
    let queryParams = {section: section};
    this.subscription = this._standardStatusesService.getAllStandardstatuses(queryParams).subscribe(
      (standardStatuses) => {
        this.isLoading = false;
        this.standardStatuses = standardStatuses?.data;
        console.log('Standard Statuses', this.standardStatuses);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }

  deleteContractDocument(event: number | string): void {
    this.isRequestLoading = true;
    this.subscription = this._documentService.deleteDocument(event).subscribe(
      (document) => {
        this.isRequestLoading = false;
        this.getAllDocuments({ 'projectID': this.addendum.contract?.project_id, 'section': 12 });
        this._notificationService.showSuccessNotification('Deleted Successfully!', 'Addendum Document has been deleted.');
      },
      (error) => {
        this.isRequestLoading = false;
      }
    );
  }

  getProjectDetails(project: IProjectData) {
    this.selectedProject = project;
  }

  displayStateProjects(state: any) {
    return state ? `${ state?.ocds_id } - ${ state?.contract_number } - ${ state?.project?.project_name }` : '';
  }

  displayStateModificationTypes(state: any) {
    return state ? state.title : '';
  }

  displayStateStatus(state: any) {
    return state ? state.title : '';
  }

  private _filter(value: any): any[] {
    let process_number = value.process_number_standard || value;

    return this.contracts.data.filter(option => (option.process_number_standard != null ? option.process_number_standard.toLowerCase().indexOf(process_number.toLowerCase()) === 0 : null));
  }

  private _filterStatus(value: any): any {
    let title = value.title || value;
    const filterValue = this._normalizeValue(title);
    return this.statuses.filter(status => this._normalizeValue(status.title).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  private _filterModificationTypes(value: any): any[] {
    let title = value.title || value;

    return this.modificationTypes.filter(option => (option.title != null ? option.title.toLowerCase().indexOf(title.toLowerCase()) === 0 : null));
  }

  get contract() {
    return this.addendumForm.get('contract_id');
  }

  get contractPrice() {
    return this.addendumForm.get('updated_contract_price');
  }

  get currency() {
    return this.addendumForm.get('currency_id');
  }

  get modificationType() {
    return this.addendumForm.get('mofification_type');
  }

  get status() {
    return this.addendumForm.get('status_id');
  }

  get standardStatus() {
    return this.addendumForm.get('standard_status_id');
  }

}
