import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

import { AddDocumentDialogComponent } from 'src/app/shared/dialogs/add-document-dialog/add-document-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ProjectService } from '../../project/_services/project.service';
import { environment } from 'src/environments/environment';
import { IPrequalification, IPrequalificationAttributes } from 'src/app/shared/interfaces/prequalification/IPrequalification';
import { IProjectAttributes, IProjectData } from 'src/app/shared/interfaces/project/IProject';
import { Subscription } from 'rxjs';
import { IQueryparam } from 'src/app/shared/interfaces/queryparam/IQueryparam';
import { OnDestroy } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { StandadStatusesService } from 'src/app/shared/services/standard-status/standad-statuses.service';
import { IStandardstatusAttributes } from 'src/app/shared/interfaces/standardstatus/IStandardstatus';
import { PrequalificationService } from '../_services/prequalification.service';
import { DocumentService } from '../../documents/_services/document.service';
import { IDocument, IDocumentData } from 'src/app/shared/interfaces/documents/IDocument';
import { AuthService } from 'src/app/auth/_services/auth.service';

@Component({
  selector: 'app-new-prequalification',
  templateUrl: './new-prequalification.component.html',
  styleUrls: ['./new-prequalification.component.scss']
})
export class NewPrequalificationComponent implements OnInit, OnDestroy {

  apiUrl = environment.apiUrl

  errorMessage: string = '';
  isLoading: boolean = false;
  isRequestLoading: boolean = false;

  documents!: IDocumentData;
  projects!: IProjectData;
  selectedProject!: IProjectAttributes
  savedPrequalificationInfo!: IPrequalification;
  standardStatuses!: IStandardstatusAttributes[];

  documentFormStep!: FormGroup;
  prequalificationForm!: FormGroup;

  filteredProjects: any;
  filteredStatuses: any;
  filteredStandardstatuses: any;

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
    private _notificationService: NotificationService,
    private _standardStatusesService: StandadStatusesService,
    private _prequalificationService: PrequalificationService,
    private _documentService: DocumentService,
  ) {
    this.getAllProjects({ q: 'all', relation: 'no-prequalification', 'organizationID': !this._authService.isAdmin() ? this._authService.getUserOrganization()['organization']['id'] : '' });
    this.getStandardStatuses(9);
  }

  ngOnInit(): void {
    this.setUpProjectForm();
  }



  setUpProjectForm(): void {
    this.prequalificationForm = this.fb.group({
      'project_id': ['', [Validators.required]], // Validators.required
      'process_number': ['', [Validators.required]], // Validators.required
      'prequalification_start': ['', []], // Validators.required
      'prequalification_end': ['', []], // Validators.required
      'standard_status_id': ['', [Validators.required]], // Validators.required
      'status_id': [(this._authService.isPublisher()) ? this.statuses[0] : '', (!this._authService.isPublisher()) ? [Validators.required] : '']
    });
  }


  openDocumentDialog() {
    const dialogRef = this.dialog.open(AddDocumentDialogComponent, {
      width: '600px',
      height: '908px',
      data: { id: this.selectedProject.id, section_id: 9 }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllDocuments({ 'projectID': this.savedPrequalificationInfo.data.project_id, 'section': 9 });
      console.log('The dialog was closed', result);
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
        this.documents = documents;
      },
      (error) => {
        this.isLoading = false;
      }
    )
  };

  deletePrequalificationDocument(event: number) {
    this.isRequestLoading = true;
    this.subscription = this._documentService.deleteDocument(event).subscribe(
      (document) => {
        this.isRequestLoading = false;
        this.getAllDocuments({ 'projectID': this.savedPrequalificationInfo.data.project_id, 'section': 9 });
        this._notificationService.showSuccessNotification('Deleted Successfully!', 'Prequalification Document has been deleted.');
      },
      (error) => {
        this.isRequestLoading = false;
      }
    );
  }
  savePrequalification(formValue: FormGroup, stepper: MatStepper) {

    if(this.prequalificationForm.invalid) {
      return;
    }

    let prequalification: IPrequalificationAttributes = {
      'id': '',
      'project_id': formValue.controls.project_id.value.id,
      'process_number_standard': formValue.controls.project_id.value.process_number_standard,
      'process_number': formValue.controls.process_number.value,
      'date_start': formValue.controls.prequalification_start.value,
      'date_end': formValue.controls.prequalification_end.value,
      'status_id': !this._authService.isPublisher() ? formValue.controls.status_id.value.id : this.statuses[0].id,
      'standard_status_id': formValue.controls.standard_status_id.value.id,
    }

    this.isRequestLoading = true;

    this.subscription = this._prequalificationService.addPrequalification(prequalification).subscribe(
      (prequalification) => {
        this.isRequestLoading = false;
        this.savedPrequalificationInfo = prequalification;
        console.log('Saved Prequalification ', this.savedPrequalificationInfo.data);
        this._notificationService.showSuccessNotification('Saved Successfully!', 'Prequalification has been saved.');
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
    return state ? `${state.process_number_standard} - ${state?.project_name }` : '';
  }

  displayStateStandardstatus(state: any) {
    return state ? state.name_local : '';
  }

  displayStateStatus(state: any) {
    return state ? state.title : '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getProjectDetails(project: IProjectAttributes) {
    this.selectedProject = project;
  }


  private _filterStatus(value: any): any {
    let title = value.title || value;
    const filterValue = this._normalizeValue(title);
    return this.statuses.filter(status => this._normalizeValue(status.title).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  private _filter(value: any): any[] {
    let process_number = value.process_number_standard || value;
    return this.projects?.data.filter(option => (option.process_number_standard != null ? option.process_number_standard.toLowerCase().indexOf(process_number.toLowerCase()) === 0 : null));
  }

  private _filterStandardstatuses(value: any): any {
    let title = value.name_local || value;

    const filterValue = this._normalizeValue(title);
    return this.standardStatuses?.filter(standardStatus => this._normalizeValue(standardStatus.name_local).includes(filterValue));
  }

  get project() {
    return this.prequalificationForm.get('project_id');
  }

  get processNumber() {
    return this.prequalificationForm.get('process_number');
  }

  get standardStatus() {
    return this.prequalificationForm.get('standard_status_id');
  }

  get status() {
    return this.prequalificationForm.get('status_id');
  }

}
