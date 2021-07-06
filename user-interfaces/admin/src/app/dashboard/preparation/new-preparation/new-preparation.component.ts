import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProject, IProjectAttributes, IProjectData } from 'src/app/shared/interfaces/project/IProject';
import { map, startWith } from 'rxjs/operators';

import { AddDocumentDialogComponent } from 'src/app/shared/dialogs/add-document-dialog/add-document-dialog.component';
import { AddFundingSourcesComponent } from 'src/app/shared/dialogs/add-funding-sources/add-funding-sources.component';
import { AddLocationDialogComponent } from '../../project/add-location-dialog/add-location-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Observable, Subscription } from 'rxjs';
import { ProjectService } from '../../project/_services/project.service';
import { environment } from 'src/environments/environment';
import { IQueryparam } from '../../../shared/interfaces/queryparam/IQueryparam';
import { EntitiesService } from '../../catalog/entities/_services/entities.service';
import { IOrganizationunit, IOrganizationunitData } from '../../../shared/interfaces/organization-unit/IOrganizationunit';
import { ICurrency } from 'src/app/shared/interfaces/currency/ICurrency';
import { CurrencyService } from 'src/app/shared/services/currency/currency.service';
import { StandadStatusesService } from 'src/app/shared/services/standard-status/standad-statuses.service';
import { IStandardstatus, IStandardstatusAttributes } from 'src/app/shared/interfaces/standardstatus/IStandardstatus';
import { IEnvironmentalcategory } from 'src/app/shared/interfaces/environmental-category/IEnvironmentalcategory';
import { EnvironmentalCategoryService } from 'src/app/shared/services/environmental-category/environmental-category.service';
import { PreparationService } from '../_services/preparation.service';
import { IPreparation, IPreparationAttributes } from 'src/app/shared/interfaces/preparation/IPreparation';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { IProjectFundingSource } from 'src/app/shared/interfaces/project-funding-source/IProjectfundingsource';
import { ProjectFundingSourceService } from '../../catalog/financing-source/_services/project-funding-source/project-funding-source.service';
import { IDocument, IDocumentData } from 'src/app/shared/interfaces/documents/IDocument';
import { DocumentService } from '../../documents/_services/document.service';
import { AuthService } from 'src/app/auth/_services/auth.service';

@Component({
  selector: 'app-new-preparation',
  templateUrl: './new-preparation.component.html',
  styleUrls: ['./new-preparation.component.scss']
})

export class NewPreparationComponent implements OnInit, OnDestroy {

  apiUrl = environment.apiUrl

  isRequestLoading: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  savedPreparationInfo!: IPreparation;
  selectedProject!: IProjectAttributes


  documents!: IDocumentData;
  currencies!: ICurrency;
  projects!: IProjectData;
  organizationUnits!: IOrganizationunitData;
  standardStatuses!: IStandardstatusAttributes[];
  environmentalCategories!: IEnvironmentalcategory;
  projectFundingSources!: IProjectFundingSource;

  fileteredProjecs: any;
  filteredCurrencies: any;
  filteredStandardstatuses: any;
  fileteredOrganizationUnits: any;
  fileteredEnvironmentalCategories: any;
  filteredStatuses: any;

  preparationForm!: FormGroup;
  locationFormStep!: FormGroup;
  documentFormStep!: FormGroup;

  filteredProjects: any;

  subscription!: Subscription;

  statuses = [
    { id: 1, title: 'BORRADOR' },
    { id: 2, title: 'PUBLICADO' },
    { id: 3, title: 'REVISIÓN' },
    { id: 4, title: 'No Definido' },
  ];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public _authService: AuthService,
    private _projectService: ProjectService,
    private _currencyService: CurrencyService,
    private _documentService: DocumentService,
    private _entitiesServices: EntitiesService,
    private _preparationService: PreparationService,
    private _notificationService: NotificationService,
    private _standardStatusesService: StandadStatusesService,
    private _projectFundingSourceService: ProjectFundingSourceService,
    private _environmentalCategoryService: EnvironmentalCategoryService,
  ) {
    this.getAllProjects({ q: 'all', relation: 'no-preparation', 'organizationID': !this._authService.isAdmin() ? this._authService.getUserOrganization()['organization']['id'] : '' });
    this.getOrganizationUnits();
    this.getCurrencies();
    this.getStandardStatuses(1);
    this.getEnvironmentalCategories();
  }


  ngOnInit(): void {
    this.setUpPreparationForm()
  }



  setUpPreparationForm(): void {
    this.preparationForm = this.fb.group({
      'project_id': ['', [Validators.required]],
      'scope': ['', [Validators.required]],
      'acquisition_entity_id': ['', [Validators.required]],
      'currency_id': ['', [Validators.required]],
      'budget': ['', [Validators.required]],
      'budget_approval_date': ['', []],
      'environmental_category_id': ['', [Validators.required]],
      'period_from': ['', ''],
      'period_until': ['', ''],
      'standard_status_id': ['', [Validators.required]],
      'status_id': [(this._authService.isPublisher()) ? this.statuses[0] : '', (!this._authService.isPublisher()) ? [Validators.required] : '']
    });


  }


  openDocumentDialog() {
    const dialogRef = this.dialog.open(AddDocumentDialogComponent, {
      width: '600px',
      height: '908px',
      data: {id: this.savedPreparationInfo.data.project_id, section_id: 1}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllDocuments({ 'projectID': this.savedPreparationInfo.data.project_id, 'section': 1 });
    });
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
      (error) => {
        this.errorMessage = <any>error;
        // this._notificationService.showErrorNotification('Error preparation', this.errorMessage);
      }
    );
  }

  getOrganizationUnits() {
    this.isLoading = true;
    this.subscription = this._entitiesServices.getAllEntitiesUnits({page: 1, limit: 20}).subscribe(
      (entities) => {
        this.isLoading = false;
        this.organizationUnits = entities;

        this.fileteredOrganizationUnits = this.acquisitionEntity?.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filterOrganizationUnit(value))
          );
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
        this.filteredCurrencies = this.currency?.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filterCurrencies(value))
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
        this.filteredStandardstatuses = this.standardStatus?.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterStandardstatuses(value))
        );
        this.getStatuses();
        console.log('Standard Statuses', this.standardStatuses);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }

  getEnvironmentalCategories() {
    this.isLoading = true;
    this.subscription = this._environmentalCategoryService.getAllEnvironmentalCategories({page: 1, limit: 20}).subscribe(
      (environmentalcategories) => {
        this.isLoading = false;
        this.environmentalCategories = environmentalcategories;
        this.fileteredEnvironmentalCategories = this.environmentalCategory?.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filterEnvironmentalCategories(value))
          );

      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }

  getStatuses() {
    this.filteredStatuses = this.status?.valueChanges.pipe(
      startWith(''),
      map(value => this._filterStatus(value))
    );
  }

  getAllProjectFundingSources(query: IQueryparam): void {
    this.isLoading = true;
    this.subscription = this._projectFundingSourceService.getAllProjectFundingSources(query).subscribe(
      (projectSources) => {
        this.isLoading = false;
        this.projectFundingSources = projectSources
      },
      (error) => {

      }
    )
  };

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

  getProjectDetails(project: IProjectAttributes) {
    this.selectedProject = project;
  }

  deleteFundingSource(event: number | string): void {
    this.isRequestLoading = true;
    this.subscription = this._projectFundingSourceService.deleteProjectFundingSources(event).subscribe(
      (source) => {
        this.isRequestLoading = false;
        this.getAllProjectFundingSources({ 'projectID': this.savedPreparationInfo.data.project_id });
        this._notificationService.showSuccessNotification('Deleted Successfully!', 'Project Funding Source has been deleted.');
      },
      (error) => {
        this.isRequestLoading = false;
      }
    );
  }

  deletePreparationDocument(event: number | string): void {
    this.isRequestLoading = true;
    this.subscription = this._documentService.deleteDocument(event).subscribe(
      (document) => {
        this.isRequestLoading = false;
        this.getAllDocuments({ 'projectID': this.savedPreparationInfo.data.project_id, 'section': 1 });
        this._notificationService.showSuccessNotification('Deleted Successfully!', 'Preparation Document has been deleted.');
      },
      (error) => {
        this.isRequestLoading = false;
      }
    );
  }
  private _filterStandardstatuses(value: any): any {
    let title = value.name_local || value;

    const filterValue = this._normalizeValue(title);
    return this.standardStatuses?.filter(standardStatus => this._normalizeValue(standardStatus.name_local).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  openFundingSourceDialog() {
    const dialogRef = this.dialog.open(AddFundingSourcesComponent, {
      width: '600px',
      height: '400px',
      data: this.savedPreparationInfo.data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllProjectFundingSources({ 'projectID': this.savedPreparationInfo.data.project_id });
    });
  }

  savePreparation(formValue: FormGroup, stepper: MatStepper) {

    if(this.preparationForm.invalid) {
      return;
    }

    let preparation: IPreparationAttributes = {
      'id': '',
      'project_id': formValue.controls.project_id.value.id,
      'status_id': !this._authService.isPublisher() ? formValue.controls.status_id.value.id : this.statuses[0].id,
      'process_number_standard': formValue.controls.project_id.value.process_number_standard,
      'project_scope': formValue.controls.scope.value,
      'project_budget': formValue.controls.budget.value,
      'project_budget_approval_date': formValue.controls.budget_approval_date.value,
      'organization_unit_id': formValue.controls.acquisition_entity_id.value.id,
      'currency_id': formValue.controls.currency_id.value.id,
      'environmental_category_id': formValue.controls.environmental_category_id.value.id,
      'standard_status_id': formValue.controls.standard_status_id.value.id,
      'start_date': formValue.controls.period_from.value,
      'end_date': formValue.controls.period_until.value,
    }

    this.isRequestLoading = true;

    this.subscription = this._preparationService.addPreparation(preparation).subscribe(
      (preparation) => {
        this.isRequestLoading = false;
        this.savedPreparationInfo = preparation;
        console.log('Saved Preparation ', this.savedPreparationInfo);
        this._notificationService.showSuccessNotification('Saved Successfully!', 'Preparation has been saved.');
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

  displayStateProjects(state: any) {
    return state ? `${ state.process_number_standard } - ${ state.project_name }` : '';
  }

  displayStateOrganizationUnits(state: any) {
    return state ? state.name : '';
  }

  displayStateCurrencies(state: any) {
    return state ? state.code : '';
  }

  displayStateStandardstatus(state: any) {
    return state ? state.name_local : '';
  }

  displayStateEnvironmantalcategories(state: any) {
    return state ? state.name : '';
  }

  displayStateStatus(state: any) {
    return state ? state.title : '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private _filter(value: any): any[] {
    let process_number = value.process_number_standard || value;
    return this.projects?.data.filter(option => (option.process_number_standard != null ? option.process_number_standard.toLowerCase().indexOf(process_number.toLowerCase()) === 0 : null));
  }

  private _filterStatus(value: any): any {
    let title = value.title || value;
    const filterValue = this._normalizeValue(title);
    return this.statuses.filter(status => this._normalizeValue(status.title).includes(filterValue));
  }


  private _filterOrganizationUnit(value: any): any[] {
    let title = value.name || value;
    return this.organizationUnits?.data.filter(option => (option.name != null ? option.name.toLowerCase().indexOf(title.toLowerCase()) === 0 : null));
  }

  private _filterCurrencies(value: any): any[] {
    let title = value.code || value;
    return this.currencies?.data.filter(option => (option.code != null ? option.code.toLowerCase().indexOf(title.toLowerCase()) === 0 : null));
  }

  private _filterEnvironmentalCategories(value: any): any[] {
    let title = value.name || value;
    return this.environmentalCategories?.data.filter(option => (option.name != null ? option.name.toLowerCase().indexOf(title.toLowerCase()) === 0 : null));
  }

  get project() {
    return this.preparationForm.get('project_id');
  }

  get scope() {
    return this.preparationForm.get('scope');
  }

  get acquisitionEntity() {
    return this.preparationForm.get('acquisition_entity_id');
  }

  get currency() {
    return this.preparationForm.get('currency_id');
  }

  get budget() {
    return this.preparationForm.get('budget');
  }

  get budgetApprovalDate() {
    return this.preparationForm.get('budget_approval_date');
  }

  get environmentalCategory() {
    return this.preparationForm.get('environmental_category_id');
  }

  get standardStatus() {
    return this.preparationForm.get('standard_status_id');
  }

  get status() {
    return this.preparationForm.get('status_id');
  }

}
