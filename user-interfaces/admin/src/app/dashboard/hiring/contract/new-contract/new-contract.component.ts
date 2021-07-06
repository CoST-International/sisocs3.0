import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

import { AddDocumentDialogComponent } from 'src/app/shared/dialogs/add-document-dialog/add-document-dialog.component';
import { AwardService } from 'src/app/dashboard/award/_services/award.service';
import { CurrencyService } from 'src/app/shared/services/currency/currency.service';
import { DocumentService } from 'src/app/dashboard/documents/_services/document.service';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { ProjectService } from 'src/app/dashboard/project/_services/project.service';
import { StandadStatusesService } from 'src/app/shared/services/standard-status/standad-statuses.service';
import { TenderMethodsService } from 'src/app/shared/services/tender-methods/tender-methods.service';
import { TenderOffererService } from 'src/app/shared/services/tender-offerer/tender-offerer.service';
import { environment } from 'src/environments/environment';
import { IQueryparam } from 'src/app/shared/interfaces/queryparam/IQueryparam';
import { IDocument, IDocumentData } from 'src/app/shared/interfaces/documents/IDocument';
import { ICurrency } from 'src/app/shared/interfaces/currency/ICurrency';
import { IProjectAttributes, IProjectData } from 'src/app/shared/interfaces/project/IProject';
import { Subscription } from 'rxjs';
import { IContract } from '../../../../shared/interfaces/contract/IContract';
import { EntitiesService } from 'src/app/dashboard/catalog/entities/_services/entities.service';
import { IStandardstatusAttributes } from 'src/app/shared/interfaces/standardstatus/IStandardstatus';
import { IOrganization, IOrganizationData } from 'src/app/shared/interfaces/organization/IOrganization';
import { IOffererData } from 'src/app/shared/interfaces/offerer/offerer';
import { OfferersService } from 'src/app/shared/services/offerers/offerers.service';
import { TooltipPosition } from '@angular/material/tooltip';
import { IContractAttributes } from 'src/app/shared/interfaces/contract/IContract';
import { ContractService } from '../_services/contract.service';
import { IAwardAttributes, IAwardData } from 'src/app/shared/interfaces/award/IAward';
import { AuthService } from 'src/app/auth/_services/auth.service';

@Component({
  selector: 'app-new-contract',
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.scss']
})
export class NewContractComponent implements OnInit {

  errorMessage: string = '';
  isLoading: boolean = false;
  isRequestLoading: boolean = false;

  contractForm!: FormGroup;
  documentFormStep!: FormGroup;

  awards!: IAwardData;
  documents!: IDocumentData;
  bidders!: IOffererData;
  currencies!: ICurrency;
  projects!: IProjectData;
  organizations!: IOrganizationData;

  savedContractInfo!: IContract;
  selectedAward!: IAwardAttributes;
  selectedProject!: IProjectAttributes;
  standardStatuses!: IStandardstatusAttributes[];

  filteredStatuses: any;
  filteredProjects: any;
  filteredAwards: any;
  filteredBidders: any;
  filteredOrganizations: any;
  filteredStandardstatuses: any;

  statuses = [
    { id: 1, title: 'BORRADOR' },
    { id: 2, title: 'PUBLICADO' },
    { id: 3, title: 'REVISIÓN' },
    { id: 4, title: 'No Definido' },
  ];

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];

  subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public _authService: AuthService,
    private _awardService: AwardService,
    private _offerService: OfferersService,
    private _projectService: ProjectService,
    private _contractService: ContractService,
    private _documentService: DocumentService,
    private _currencyService: CurrencyService,
    private _entitiesServices: EntitiesService,
    private _notificationService: NotificationService,
    private _tenderOffererService: TenderOffererService,
    private _tenderMethodsService: TenderMethodsService,
    private _standardStatusesService: StandadStatusesService,
  ) {
    this.getAllProjects({ q: 'all', relation: 'only-award', 'organizationID': !this._authService.isAdmin() ? this._authService.getUserOrganization()['organization']['id'] : ''  });
    this.getAllAwards({ q: 'all', relation: 'no-contract', 'organizationID': !this._authService.isAdmin() ? this._authService.getUserOrganization()['organization']['id'] : ''  });
    this.getAllBidders({ 'q': 'all'});
    this.getOrganizations();
    this.getStandardStatuses(4);
    this.getCurrencies();
  }

  ngOnInit(): void {
    this.setUpProjectForm();
  }

  setUpProjectForm(): void {
    this.contractForm = this.fb.group({
      // 'project_id': ['', [Validators.required]],
      // 'organization_id': ['', [Validators.required]],
      // 'contracted_company_id': ['', [Validators.required]], // Validators.required
      // 'contract_number': ['', [Validators.required]], // Validators.required
      // 'contract_title': ['', [Validators.required]], // Validators.required
      // 'scope_of_contract': ['', [Validators.required]], // Validators.required
      // 'currency_id': ['', [Validators.required]], // Validators.required
      // 'contract_cost': ['', [Validators.required]], // Validators.required
      // 'duration': ['', []], // Validators.required
      // 'end_date': ['', []], // Validators.required
      // 'start_date': ['', []], // Validators.required
      // 'standard_status_id': ['', [Validators.required]], // Validators.required
      // 'status_id': ['', [Validators.required]], // Validators.required

      // 'process_number_standard'
      'contract_number': ['', [Validators.required]],
      'contract_title': ['', [Validators.required]],
      'contract_scope': ['', [Validators.required]],
      'currency_id': ['', [Validators.required]],
      'contract_cost': ['', [Validators.required]],
      // 'price_local_currency'
      // 'price_usd_currency'
      'start_date': [''],
      'end_date': [''],
      'duration': [''],
      // 'awards_id'
      'organization_id': ['', [Validators.required]],
      'offerer_id': ['', [Validators.required]],
      'status_id': [(this._authService.isPublisher()) ? this.statuses[0] : '', (!this._authService.isPublisher()) ? [Validators.required] : ''],
      'standard_status_id': ['', [Validators.required]],
      // 'user_creation'
      // 'project_id': ['', Validators.required],
      'award_id': ['', Validators.required]
    });
  }


  openDocumentDialog() {
    const dialogRef = this.dialog.open(AddDocumentDialogComponent, {
      width: '600px',
      height: '908px',
      data: { id: this.savedContractInfo.data.project_id, section_id: 4 }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllDocuments({ 'projectID': this.savedContractInfo.data.project_id, 'section': 4 });
    });
  }

  getProjectDetails(project: IProjectAttributes) {
    this.selectedProject = project;
    console.log('Selected Project OCDSID', this.selectedProject?.award?.ocds_id)
  }

  getAwardDetails(award: IAwardAttributes) {
    this.selectedAward = award;
    console.log('Selected Award OCDSID', this.selectedProject)
  }

  getAllProjects(queryParam: IQueryparam) {
    this.isLoading = true;
    this._projectService.getAllProjects(queryParam).subscribe(
      (projects) => {
        this.isLoading = false;
        this.projects = projects;
        this.filteredProjects = this.project?.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
        console.log('Projects ', this.projects);
      },
      error => this.errorMessage = <any>error
    );
  }

  getAllAwards(queryParam: IQueryparam) {
    this.isLoading = true;
    this._awardService.getAllAwards(queryParam).subscribe(
      (awards) => {
        this.isLoading = false;
        this.awards = awards;
        this.filteredAwards = this.award?.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filterAward(value))
          );
        console.log('Awards ', this.awards);
      },
      error => this.errorMessage = <any>error
    );
  }

  getOrganizations() {
    this.isLoading = true;
    this.subscription = this._entitiesServices.getAllEntities({page: 1, limit: 20}).subscribe(
      (entities) => {
        this.isLoading = false;
        this.organizations = entities;

        this.filteredOrganizations = this.responsibleOrganization?.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filterEntities(value))
          );
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
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = <any> error;
      }
    );
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

  getAllDocuments(query: IQueryparam): void {
    this.isLoading = true;
    this.subscription = this._documentService.getAllDocuments(query).subscribe(
      (documents) => {
        this.isLoading = false;
        this.documents = documents
      },
      (error) => {
        this.isLoading = false;
      }
    )
  };

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

  saveContract(formValue: FormGroup, stepper: MatStepper) {

    if(this.contractForm.invalid) {
      return;
    }

    let contract: IContractAttributes = {
      'id': '',
      'process_number_standard': formValue.controls.award_id.value.project.process_number_standard,
      'contract_number': formValue.controls.contract_number.value,
      'contract_title': formValue.controls.contract_title.value,
      'contract_scope': formValue.controls.contract_scope.value,
      'price_local_currency': formValue.controls.contract_cost.value,
      'price_usd_currency': formValue.controls.contract_cost.value,
      'start_date': formValue.controls.start_date.value.id,
      'end_date': formValue.controls.end_date.value.id,
      'duration': formValue.controls.duration.value.id,
      'award_id': formValue.controls.award_id.value.id,
      'organization_id': formValue.controls.organization_id.value.id,
      'offerer_id': Number(formValue.controls.offerer_id.value),
      'status_id': !this._authService.isPublisher() ? formValue.controls.status_id.value.id : this.statuses[0].id,
      'standard_status_id': formValue.controls.standard_status_id.value.id,
      'project_id': formValue.controls.award_id.value.project.id,
      'ocds_id': formValue.controls.award_id.value.ocds_id,
      'currency_id': formValue.controls.currency_id.value,
    }

    this.isRequestLoading = true;

    this.subscription = this._contractService.addContract(contract).subscribe(
      (contract) => {
        this.isRequestLoading = false;
        this.savedContractInfo = contract;
        this._notificationService.showSuccessNotification('Saved Successfully!', 'Contract has been saved.');
        this.nextLocation(stepper);
      },
      (error) => {
        this.isRequestLoading = false;
      }
    )
  }

  deleteContractDocument(event: number | string): void {
    this.isRequestLoading = true;
    this.subscription = this._documentService.deleteDocument(event).subscribe(
      (document) => {
        this.isRequestLoading = false;
        this.getAllDocuments({ 'projectID': this.savedContractInfo.data.project_id, 'section': 4 });
        this._notificationService.showSuccessNotification('Deleted Successfully!', 'Contract Document has been deleted.');
      },
      (error) => {
        this.isRequestLoading = false;
      }
    );
  }

  nextLocation(stepper: MatStepper) {
    stepper.next();
  }

  displayStateOrganizations(state: any) {
    return state ? state.organization_name : '';
  }

  displayStateProjects(state: any) {
    return state ? `${ state?.award?.ocds_id } - ${ state.project_name }` : '';
  }

  displayStateAwards(state: any) {
    return state ? `${ state?.ocds_id } - ${ state.project?.project_name }` : '';
  }

  displayStateStandardstatus(state: any) {
    return state ? state.name_local : '';
  }

  displayStateStatus(state: any) {
    return state ? state.title : '';
  }

  displayStateEntities(state: any) {
    return state ? state.organization_name : '';
  }

  displayStateOfferers(state: any) {
    return state ? state.offerer_name : '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private _filterStatus(value: any): any {
    let title = value.title || value;
    const filterValue = this._normalizeValue(title);
    return this.statuses.filter(status => this._normalizeValue(status.title).includes(filterValue));
  }

  private _filterStandardstatuses(value: any): any {
    let title = value.name_local || value;

    const filterValue = this._normalizeValue(title);
    return this.standardStatuses?.filter(standardStatus => this._normalizeValue(standardStatus.name_local).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  private _filter(value: any): any[] {
    let process_number = value.process_number_standard || value;

    return this.projects.data.filter(option => (option.process_number_standard != null ? option.process_number_standard.toLowerCase().indexOf(process_number.toLowerCase()) === 0 : null));
  }
  private _filterAward(value: any): any[] {
    let process_number = value.process_number_standard || value;

    return this.awards?.data.filter(option => (option.process_number_standard != null ? option.process_number_standard.toLowerCase().indexOf(process_number.toLowerCase()) === 0 : null));
  }

  private _filterEntities(value: any): any[] {
    let name = value.organization_name || value;

    return this.organizations?.data.filter(option => (option.organization_name != null ? option.organization_name.toLowerCase().indexOf(name.toLowerCase()) === 0 : null));
  }

  private _filterOfferers(value: any): any[] {
    let name = value.name || value;

    return this.bidders?.data.filter(option => (option.name != null ? option.name.toLowerCase().indexOf(name.toLowerCase()) === 0 : null));
  }

  get project() {
    return this.contractForm.get('project_id');
  }

  get award() {
    return this.contractForm.get('award_id');
  }

  get responsibleOrganization() {
    return this.contractForm.get('organization_id');
  }

  get processNumber() {
    return this.contractForm.get('process_number');
  }

  get currency() {
    return this.contractForm.get('currency_id');
  }

  get standardStatus() {
    return this.contractForm.get('standard_status_id');
  }

  get status() {
    return this.contractForm.get('status_id');
  }

  get offerer() {
    return this.contractForm.get('offerer_id');
  }

  get contractNumber() {
    return this.contractForm.get('contract_number');
  }

  get contractTitle() {
    return this.contractForm.get('contract_title');
  }

  get contractScope() {
    return this.contractForm.get('contract_scope');
  }

  get contractCost() {
    return this.contractForm.get('contract_cost');
  }

}
