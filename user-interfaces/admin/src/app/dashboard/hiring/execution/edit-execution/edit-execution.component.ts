import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { ContactService } from 'src/app/dashboard/catalog/contact/_services/contact.service';
import { DocumentService } from 'src/app/dashboard/documents/_services/document.service';
import { ProjectService } from 'src/app/dashboard/project/_services/project.service';
import { AddDocumentDialogComponent } from 'src/app/shared/dialogs/add-document-dialog/add-document-dialog.component';
import { IAddendum } from 'src/app/shared/interfaces/addendum/IAddendum';
import { IContactData } from 'src/app/shared/interfaces/contact/IContact';
import { IContractData } from 'src/app/shared/interfaces/contract/IContract';
import { ICurrency } from 'src/app/shared/interfaces/currency/ICurrency';
import { IDocumentData } from 'src/app/shared/interfaces/documents/IDocument';
import { IExecutionAttributes } from 'src/app/shared/interfaces/execution/IExecution';
import { IProjectData } from 'src/app/shared/interfaces/project/IProject';
import { IQueryparam } from 'src/app/shared/interfaces/queryparam/IQueryparam';
import { CurrencyService } from 'src/app/shared/services/currency/currency.service';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { environment } from 'src/environments/environment';
import { AddendaService } from '../../addenda/_services/addenda.service';
import { ContractService } from '../../contract/_services/contract.service';
import { ExecutionService } from '../_services/execution.service';
import { DecryptService } from '../../../../shared/services/decrypt/decrypt.service';

@Component({
  selector: 'app-edit-execution',
  templateUrl: './edit-execution.component.html',
  styleUrls: ['./edit-execution.component.scss']
})
export class EditExecutionComponent {

  apiUrl = environment.apiUrl

  isLoading!: boolean;
  isRequestLoading: boolean = false;
  errorMessage: string = '';

  executionForm!: FormGroup;
  documentFormStep!: FormGroup;

  documents!: IDocumentData;
  contracts!: IContractData;
  contacts!: IContactData;
  selectedProject!: IProjectData;

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

  savedAddendumInfo!: IAddendum;

  executionId!: number | string;
  execution!: IExecutionAttributes;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    public _authService: AuthService,
    private _addendaService: AddendaService,
    private _contactService: ContactService,
    private _currencyService: CurrencyService,
    private _contractService: ContractService,
    private _documentService: DocumentService,
    private _executionService: ExecutionService,
    private _notificationService: NotificationService,
    private _decryptService: DecryptService,
    private _projectService: ProjectService
  ) {
    this.subscription = this.route.params.subscribe((params) => {
      this.executionId = this._decryptService.decrypt(params['id']);
    });
    this.getExecutionById(this.executionId);
   }


  setUpContractForm(execution: IExecutionAttributes): void {
    this.executionForm = this.fb.group({
      'contract_id': [execution?.contact_id ? execution?.contact_id : '', [Validators.required]],
      'var_time': [execution?.var_time ? execution?.var_time : '', []],
      'var_price': [execution?.var_price ? execution?.var_price : '', []],
      'start_date': [execution?.start_date ? execution?.start_date : '', []],
      'contact_id': [execution?.contact_id ? execution?.contact_id : '', [Validators.required]],
      'status_id': [(this._authService.isPublisher()) ? this.statuses[0] : execution?.status_id ? execution?.status_id : '', (!this._authService.isPublisher()) ? [Validators.required] : '']
    });
  }

  openDocumentDialog() {
    const dialogRef = this.dialog.open(AddDocumentDialogComponent, {
      width: '600px',
      height: '908px',
      data: { id: this.savedAddendumInfo.data.contract?.project_id, section_id: 10 }
    });

    dialogRef.afterClosed().subscribe(result => {
    this.getAllDocuments({ 'projectID': this.savedAddendumInfo.data.contract?.project_id, 'section': 10 });
    });
  }

  updateExecution(formValue: FormGroup) {

    if(this.executionForm.invalid) {
      return;
    }

    let execution: IExecutionAttributes = {
      'id': '',
      'status_id': !this._authService.isPublisher() ? +formValue.controls.status_id.value : this.statuses[0].id,
      'var_time': formValue.controls.var_time.value,
      'var_price': formValue.controls.var_price.value,
      'start_date': formValue.controls.start_date.value,
      // 'contract_id': formValue.controls.contract_id.value.id,
      'contact_id': +formValue.controls.contact_id.value,
      'ocds_id': this.execution.ocds,
    }

    this.isRequestLoading = true;

    console.log('Execution Data ', execution);

    this.subscription = this._executionService.updateExecution(execution, this.executionId).subscribe(
      (execution) => {
        this.isRequestLoading = false;
        this._notificationService.showSuccessNotification('Updated Successfully!', 'Execution has been updated.');
        this.router.navigateByUrl('/dashboard/hiring/executions');
      },
      (error) => {
        this.isRequestLoading = false;
      }
    )
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

  getAllContacts(queryParam: IQueryparam) {
    this.isLoading = true;
    this._contactService.getAllContacts(queryParam).subscribe(
      (contacts) => {
        this.isLoading = false;
        this.contacts = contacts;
        console.log('Contacts ', this.contracts);
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

  getExecutionById(id: string | number): void {
    this.isLoading = true;
    this.subscription = this._executionService.getExecutionById(id).subscribe(
      (execution) => {
        this.isLoading = false;
        this.execution = execution.data;
        console.log('Execution Details ', this.execution);
        this.setUpContractForm(this.execution);
        this.getAllContracts({ 'q': 'all', 'relation': 'project' });
        this.getAllContacts({ 'q': 'all' });
      },
      (error) => {
        this.isLoading = false;
      }
    )
  }

  deleteContractDocument(event: number | string): void {
    this.isRequestLoading = true;
    this.subscription = this._documentService.deleteDocument(event).subscribe(
      (document) => {
        this.isRequestLoading = false;
        this.getAllDocuments({ 'projectID': this.savedAddendumInfo.data.contract?.project_id, 'section': 10 });
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

  get contract() {
    return this.executionForm.get('contract_id');
  }

  get contact() {
    return this.executionForm.get('contact_id');
  }

  get status() {
    return this.executionForm.get('status_id');
  }

}
