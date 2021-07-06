import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { AddDocumentDialogComponent } from 'src/app/shared/dialogs/add-document-dialog/add-document-dialog.component';
import { AddFundingSourcesComponent } from 'src/app/shared/dialogs/add-funding-sources/add-funding-sources.component';
import { ICurrency } from 'src/app/shared/interfaces/currency/ICurrency';
import { IDocument, IDocumentData } from 'src/app/shared/interfaces/documents/IDocument';
import { IEnvironmentalcategory } from 'src/app/shared/interfaces/environmental-category/IEnvironmentalcategory';
import { IOrganizationunit, IOrganizationunitData } from 'src/app/shared/interfaces/organization-unit/IOrganizationunit';
import { IPreparation, IPreparationAttributes } from 'src/app/shared/interfaces/preparation/IPreparation';
import { IProjectFundingSource } from 'src/app/shared/interfaces/project-funding-source/IProjectfundingsource';
import { IProjectAttributes, IProjectData } from 'src/app/shared/interfaces/project/IProject';
import { IQueryparam } from 'src/app/shared/interfaces/queryparam/IQueryparam';
import { IStandardstatusAttributes } from 'src/app/shared/interfaces/standardstatus/IStandardstatus';
import { CurrencyService } from 'src/app/shared/services/currency/currency.service';
import { EnvironmentalCategoryService } from 'src/app/shared/services/environmental-category/environmental-category.service';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { StandadStatusesService } from 'src/app/shared/services/standard-status/standad-statuses.service';
import { environment } from 'src/environments/environment';
import { EntitiesService } from '../../catalog/entities/_services/entities.service';
import { ProjectFundingSourceService } from '../../catalog/financing-source/_services/project-funding-source/project-funding-source.service';
import { DocumentService } from '../../documents/_services/document.service';
import { ProjectService } from '../../project/_services/project.service';
import { PreparationService } from '../_services/preparation.service';
import { ActivatedRoute } from '@angular/router';
import { DecryptService } from 'src/app/shared/services/decrypt/decrypt.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-edit-preparation',
  templateUrl: './edit-preparation.component.html',
  styleUrls: ['./edit-preparation.component.scss']
})
export class EditPreparationComponent implements OnDestroy {

  apiUrl = environment.apiUrl

  isRequestLoading: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  savedPreparationInfo!: IPreparationAttributes;
  selectedProject!: IProjectAttributes;


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

  preparationId!: number | string;
  preparation!: IPreparationAttributes;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public _authService: AuthService,
    private _decryptService: DecryptService,
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
    this.subscription = this.route.params.subscribe((params) => {
      this.preparationId = this._decryptService.decrypt(params['id']);
    });

    console.log('Preparation ID ', this.preparationId);

    this.getPreparationById(this.preparationId);
  }


  setUpPreparationForm(preparation: IPreparationAttributes): void {
    this.preparationForm = this.fb.group({
      'project_id': [preparation?.project?.data ? preparation?.project?.data[0] : '', [Validators.required]],
      'scope': [preparation?.project_scope ? preparation?.project_scope : '', [Validators.required]],
      'acquisition_entity_id': [preparation?.organizationUnit ? preparation?.organizationUnit : '', [Validators.required]],
      'currency_id': [preparation?.currency ? preparation?.currency : '', [Validators.required]],
      'budget': [preparation?.project_budget ? preparation?.project_budget : '', [Validators.required]],
      'budget_approval_date': [preparation?.project_budget_approval_date ? preparation?.project_budget_approval_date : '', []],
      'environmental_category_id': [preparation?.environmentCategory ? preparation?.environmentCategory : '', [Validators.required]],
      'period_from': [preparation?.start_date ? preparation?.start_date : '', ''],
      'period_until': [preparation?.end_date ? preparation?.end_date : '', ''],
      'standard_status_id': [preparation?.standardStatus ? preparation?.standardStatus : '', [Validators.required]],
      'status_id': [preparation?.status ? preparation?.status : (this._authService.isPublisher()) ? this.statuses[0] : '', (!this._authService.isPublisher()) ? [Validators.required] : '']
    });

  }


  openDocumentDialog() {
    const dialogRef = this.dialog.open(AddDocumentDialogComponent, {
      width: '600px',
      height: '908px',
      data: {id: this.savedPreparationInfo.project_id, section_id: 1}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllDocuments({ 'projectID': this.savedPreparationInfo.project_id, 'section': 1 });
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
      error => this.errorMessage = <any>error
    );
  }

  getPreparationById(id: string | number): void {
    this.isLoading = true;
    this.subscription = this._preparationService.getPreparationById(id).subscribe(
      (preparation) => {
        this.isLoading = false;
        this.preparation = preparation.data;
        console.log('Preparation Details ', this.preparation);
        this.setUpPreparationForm(this.preparation);
        this.getAllProjects({ q: 'all', relation: 'no-preparation' });
        this.getAllDocuments({ 'projectID': this.preparation.project_id, 'section': 1 });
        this.getAllProjectFundingSources({ 'projectID': this.preparation.project_id });
        this.getOrganizationUnits();
        this.getCurrencies();
        this.getStandardStatuses(1);
        this.getEnvironmentalCategories();
      },
      (error) => {
        this.isLoading = false;
      }
    )
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
        this.getAllProjectFundingSources({ 'projectID': this.savedPreparationInfo.project_id });
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
        this.getAllDocuments({ 'projectID': this.savedPreparationInfo.project_id, 'section': 1 });
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
      data: this.savedPreparationInfo
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllProjectFundingSources({ 'projectID': this.savedPreparationInfo.project_id });
    });
  }

  updatePreparation(formValue: FormGroup, stepper: MatStepper) {

    if(this.preparationForm.invalid) {
      return;
    }

    let preparation: IPreparationAttributes = {
      'id': '',
      'project_id': formValue.controls.project_id.value.id,
      'status_id': formValue.controls.status_id.value.id,
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

    console.log('New Preparation ', preparation);

    this.isRequestLoading = true;

    this.subscription = this._preparationService.updatePreparation(preparation, this.preparationId).subscribe(
      (preparation) => {
        this.isRequestLoading = false;
        this.savedPreparationInfo = preparation;
        console.log('Saved Preparation ', this.savedPreparationInfo);
        this._notificationService.showSuccessNotification('Updated Successfully!', 'Preparation has been updated.');
        this.nextLocation(stepper);
        this.getAllDocuments({ 'projectID': this.preparation.project_id, 'section': 1 });
        this.getAllProjectFundingSources({ 'projectID': this.preparation.project_id });
      },
      (error) => {
        this.isRequestLoading = false;
        this._notificationService.showErrorNotification('Update Error!', ['Preparation failed to update.']);
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
