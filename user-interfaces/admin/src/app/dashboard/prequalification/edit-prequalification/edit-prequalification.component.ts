import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AddDocumentDialogComponent } from 'src/app/shared/dialogs/add-document-dialog/add-document-dialog.component';
import { IDocument, IDocumentData } from 'src/app/shared/interfaces/documents/IDocument';
import { IPrequalification, IPrequalificationAttributes } from 'src/app/shared/interfaces/prequalification/IPrequalification';
import { IProjectData, IProjectAttributes } from 'src/app/shared/interfaces/project/IProject';
import { IQueryparam } from 'src/app/shared/interfaces/queryparam/IQueryparam';
import { IStandardstatusAttributes } from 'src/app/shared/interfaces/standardstatus/IStandardstatus';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { StandadStatusesService } from 'src/app/shared/services/standard-status/standad-statuses.service';
import { environment } from 'src/environments/environment';
import { DocumentService } from '../../documents/_services/document.service';
import { ProjectService } from '../../project/_services/project.service';
import { PrequalificationService } from '../_services/prequalification.service';
import { ActivatedRoute } from '@angular/router';
import { DecryptService } from 'src/app/shared/services/decrypt/decrypt.service';
import { AuthService } from 'src/app/auth/_services/auth.service';

@Component({
  selector: 'app-edit-prequalification',
  templateUrl: './edit-prequalification.component.html',
  styleUrls: ['./edit-prequalification.component.scss']
})
export class EditPrequalificationComponent implements OnInit, OnDestroy {

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

  prequalificationId!: number | string;
  prequalification!: IPrequalificationAttributes;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public _authService: AuthService,
    private _decryptService: DecryptService,
    private _projectService: ProjectService,
    private _documentService: DocumentService,
    private _notificationService: NotificationService,
    private _standardStatusesService: StandadStatusesService,
    private _prequalificationService: PrequalificationService,
  ) {

    this.subscription = this.route.params.subscribe((params) => {
      this.prequalificationId = this._decryptService.decrypt(params['id']);
    });

    this.getPrequalificationById(this.prequalificationId);

  }

  ngOnInit(): void {
  }



  setUpProjectForm(prequalification: IPrequalificationAttributes): void {
    this.prequalificationForm = this.fb.group({
      'project_id': [prequalification?.project?.data ? prequalification?.project?.data[0] : '', [Validators.required]],
      'process_number': [prequalification?.process_number ? prequalification?.process_number : '', [Validators.required]],
      'prequalification_start': [prequalification?.date_start ? prequalification?.date_start : '', []],
      'prequalification_end': [prequalification?.date_end ? prequalification?.date_end : '', []],
      'standard_status_id': [prequalification?.standardStatus?.id ? prequalification?.standardStatus?.id : '', [Validators.required]],
      'status_id': [prequalification?.status_id ? prequalification?.status_id : (this._authService.isPublisher()) ? this.statuses[0] : '', (!this._authService.isPublisher()) ? [Validators.required] : '']
    });
  }


  openDocumentDialog() {
    const dialogRef = this.dialog.open(AddDocumentDialogComponent, {
      width: '600px',
      height: '908px',
      data: { id: this.prequalification.project_id, section_id: 9 }
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
        this.documents = documents;
      },
      (error) => {
        this.isLoading = false;
      }
    )
  };

  getPrequalificationById(id: string | number): void {
    this.isLoading = true;
    this.subscription = this._prequalificationService.getPrequalificationById(id).subscribe(
      (prequalification) => {
        this.isLoading = false;
        this.prequalification = prequalification.data;
        console.log('Prequalification Details ', this.prequalification);
        this.setUpProjectForm(this.prequalification);
        this.getAllProjects({ q: 'all', relation: 'no-prequalification' });
        this.getStandardStatuses(9);
        this.getAllDocuments({ 'projectID': this.prequalification.project_id, 'section': 9 });
      },
      (error) => {
        this.isLoading = false;
      }
    )
  }

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
  updatePrequalification(formValue: FormGroup, stepper: MatStepper) {

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
      'status_id': formValue.controls.status_id.value,
      'standard_status_id': formValue.controls.standard_status_id.value,
    }

    console.log('Prequalification ', prequalification);

    this.isRequestLoading = true;

    this.subscription = this._prequalificationService.updatePrequalification(prequalification, this.prequalificationId).subscribe(
      (prequalification) => {
        this.isRequestLoading = false;
        this._notificationService.showSuccessNotification('Updated Successfully!', 'Prequalification has been updated.');
        this.nextLocation(stepper);
        this.getAllDocuments({ 'projectID': this.prequalification.project_id, 'section': 9 });
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
