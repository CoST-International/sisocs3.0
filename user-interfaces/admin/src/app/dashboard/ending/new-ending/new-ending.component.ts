import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

import { AddDocumentDialogComponent } from 'src/app/shared/dialogs/add-document-dialog/add-document-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { TooltipPosition } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { ICompletion, ICompletionAttributes } from 'src/app/shared/interfaces/completion/ICompletion';
import { IDocument, IDocumentData } from 'src/app/shared/interfaces/documents/IDocument';
import { ICurrency } from 'src/app/shared/interfaces/currency/ICurrency';
import { IProjectAttributes, IProjectData } from 'src/app/shared/interfaces/project/IProject';
import { IStandardstatusAttributes } from 'src/app/shared/interfaces/standardstatus/IStandardstatus';
import { IQueryparam } from 'src/app/shared/interfaces/queryparam/IQueryparam';
import { ProjectService } from '../../project/_services/project.service';
import { ContractService } from '../../hiring/contract/_services/contract.service';
import { DocumentService } from '../../documents/_services/document.service';
import { CurrencyService } from 'src/app/shared/services/currency/currency.service';
import { EntitiesService } from '../../catalog/entities/_services/entities.service';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { TenderOffererService } from 'src/app/shared/services/tender-offerer/tender-offerer.service';
import { TenderMethodsService } from 'src/app/shared/services/tender-methods/tender-methods.service';
import { StandadStatusesService } from 'src/app/shared/services/standard-status/standad-statuses.service';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { IAwardAttributes, IAwardData } from 'src/app/shared/interfaces/award/IAward';
import { AwardService } from '../../award/_services/award.service';
import { CompletionService } from '../_services/completion.service';

@Component({
  selector: 'app-new-ending',
  templateUrl: './new-ending.component.html',
  styleUrls: ['./new-ending.component.scss']
})
export class NewEndingComponent implements OnInit {

  errorMessage: string = '';
  isLoading: boolean = false;
  isRequestLoading: boolean = false;

  completionForm!: FormGroup;
  documentFormStep!: FormGroup;

  awards!: IAwardData;
  documents!: IDocumentData;
  currencies!: ICurrency;
  projects!: IProjectData;

  selectedAward!: IAwardAttributes;
  savedCompletionInfo!: ICompletion;
  selectedProject!: IProjectAttributes;
  standardStatuses!: IStandardstatusAttributes[];

  filteredAwards: any;
  filteredStatuses: any;
  filteredProjects: any;
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
    private _projectService: ProjectService,
    private _documentService: DocumentService,
    private _currencyService: CurrencyService,
    private _entitiesServices: EntitiesService,
    private _completionService: CompletionService,
    private _notificationService: NotificationService,
    private _standardStatusesService: StandadStatusesService,
  ) {
    this.getAllProjects({ q: 'all', relation: 'only-contract', 'organizationID': !this._authService.isAdmin() ? this._authService.getUserOrganization()['organization']['id'] : ''   });
    this.getAllAwards({ q: 'all', relation: 'contract', 'organizationID': !this._authService.isAdmin() ? this._authService.getUserOrganization()['organization']['id'] : ''  });
    this.getStandardStatuses(7);
    this.getCurrencies();
  }

  ngOnInit(): void {
    this.setUpCompletionForm();
  }

  setUpCompletionForm(): void {
    this.completionForm = this.fb.group({
      // 'project_id': ['', []], // Validators.required
      'award_id': ['', [Validators.required]],
      'date_at_completion': ['', []], // Validators.required
      'number_of_women_hired': ['', []], // Validators.required
      'reason_for_changes_to_end_date': ['', []], // Validators.required
      'currency_id': ['', [Validators.required]],
      'completion_cost': ['', []], // Validators.required
      'reason_for_changes_to_project_cost': ['', []], // Validators.required
      'completion_scope': ['', []], // Validators.required
      'reasons_for_scope_changes': ['', []], // Validators.required
      'expected_life_from': ['', []], // Validators.required
      'until': ['', []], // Validators.required
      'standard_status_id': ['', [Validators.required]],
      'status_id': [(this._authService.isPublisher()) ? this.statuses[0] : '', (!this._authService.isPublisher()) ? [Validators.required] : '']
    });
  }

  saveCompletion(formValue: FormGroup, step: MatStepper) {

    if(this.completionForm.invalid) {
      return;
    }

    let completion: ICompletionAttributes = {
      'id': '',
      'project_id': formValue.controls.award_id.value.project.id,
      'standard_status_id': formValue.controls.standard_status_id.value.id,
      'status_id': !this._authService.isPublisher() ? formValue.controls.status_id.value.id : this.statuses[0].id,
      'process_number_standard': formValue.controls.award_id.value.project.process_number_standard,
      'final_scope': formValue.controls.completion_scope.value,
      'date': formValue.controls.date_at_completion.value,
      'from': formValue.controls.expected_life_from.value,
      'to': formValue.controls.until.value,
      'description': formValue.controls.reason_for_changes_to_end_date.value,
      'change_specifications': formValue.controls.reason_for_changes_to_project_cost.value,
      'justification': formValue.controls.reasons_for_scope_changes.value,
      'final_cost': formValue.controls.completion_cost.value,
      'ocds_id': formValue.controls.award_id.value.project.process_number_standard
    }

    console.log('Completion Details ', completion);


    this.isRequestLoading = true;

    this.subscription = this._completionService.addCompletion(completion).subscribe(
      (completion) => {
        this.isRequestLoading = false;
        this.savedCompletionInfo = completion;
        this._notificationService.showSuccessNotification('Saved Successfully!', 'Completion has been saved.');
        this.nextLocation(step);
      },
      (error) => {
        this.isRequestLoading = false;
      }
    )
  }

  deleteCompletionDocument(event: number | string): void {
    this.isRequestLoading = true;
    this.subscription = this._documentService.deleteDocument(event).subscribe(
      (document) => {
        this.isRequestLoading = false;
        this.getAllDocuments({ 'projectID': this.savedCompletionInfo.data.project_id, 'section': 7 });
        this._notificationService.showSuccessNotification('Deleted Successfully!', 'Completion Document has been deleted.');
      },
      (error) => {
        this.isRequestLoading = false;
      }
    );
  }

  openDocumentDialog() {
    const dialogRef = this.dialog.open(AddDocumentDialogComponent, {
      width: '600px',
      height: '908px',
      data: { id: this.savedCompletionInfo.data.project_id, section_id: 7 }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllDocuments({ 'projectID': this.savedCompletionInfo.data.project_id, 'section': 7 });
    });
  }

  nextLocation(stepper: MatStepper) {
    stepper.next();
  }

  getProjectDetails(project: IProjectAttributes) {
    this.selectedProject = project;
    console.log('Selected Project OCDSID', this.selectedProject?.award?.ocds_id)
  }

  getAwardDetails(award: IAwardAttributes) {
    this.selectedAward = award;
    console.log('Selected Award OCDSID', this.selectedAward)
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

  private _filterAward(value: any): any[] {
    let process_number = value.process_number_standard || value;

    return this.awards?.data.filter(option => (option.process_number_standard != null ? option.process_number_standard.toLowerCase().indexOf(process_number.toLowerCase()) === 0 : null));
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

  get project() {
    return this.completionForm.get('project_id');
  }

  get award() {
    return this.completionForm.get('award_id');
  }

  get currency() {
    return this.completionForm.get('currency_id');
  }

  get standardStatus() {
    return this.completionForm.get('standard_status_id');
  }

  get status() {
    return this.completionForm.get('status_id');
  }


}
