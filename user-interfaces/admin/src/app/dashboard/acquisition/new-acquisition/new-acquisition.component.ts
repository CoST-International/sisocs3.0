import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AddDocumentDialogComponent } from 'src/app/shared/dialogs/add-document-dialog/add-document-dialog.component';
import { IProjectAttributes, IProjectData } from 'src/app/shared/interfaces/project/IProject';
import { IQueryparam } from 'src/app/shared/interfaces/queryparam/IQueryparam';
import { IStandardstatusAttributes } from 'src/app/shared/interfaces/standardstatus/IStandardstatus';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { StandadStatusesService } from 'src/app/shared/services/standard-status/standad-statuses.service';
import { environment } from 'src/environments/environment';
import { ProjectService } from '../../project/_services/project.service';
import { ITender, ITenderAttributes } from '../../../shared/interfaces/tender/ITender';
import { AcquisitionsService } from '../_services/acquisitions.service';
import { IDocument, IDocumentData } from 'src/app/shared/interfaces/documents/IDocument';
import { DocumentService } from '../../documents/_services/document.service';
import { AuthService } from 'src/app/auth/_services/auth.service';

@Component({
  selector: 'app-new-acquisition',
  templateUrl: './new-acquisition.component.html',
  styleUrls: ['./new-acquisition.component.scss']
})
export class NewAcquisitionComponent implements OnInit {

  errorMessage: string = '';
  isLoading: boolean = false;
  isRequestLoading: boolean = false;

  acquisitionForm!: FormGroup;
  documentFormStep!: FormGroup;

  documents!: IDocumentData;
  projects!: IProjectData;
  savedAcquisitionInfo!: ITender;
  selectedProject!: IProjectAttributes;
  standardStatuses!: IStandardstatusAttributes[];

  filteredStatuses: any;
  filteredProjects: any;
  filteredStandardstatuses: any;

  acquisitionProcesses = [
    {
      id: 1,
      title: 'Open'
    },
    {
      id: 2,
      title: 'Selective'
    },
    {
      id: 3,
      title: 'Limited'
    },
    {
      id: 4,
      title: 'Direct'
    },
  ];

  contractTypes = [
    {
      id: 1,
      title: 'Design'
    },
    {
      id: 2,
      title: 'Building'
    },
    {
      id: 3,
      title: 'Supervision'
    }
  ];

  statuses = [
    { id: 1, title: 'BORRADOR' },
    { id: 2, title: 'PUBLICADO' },
    { id: 3, title: 'REVISIÓN' },
    { id: 4, title: 'No Definido' },
  ];

  subscription!: Subscription;

  organizationIdentifier!: number | string;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public _authService: AuthService,
    private _projectService: ProjectService,
    private _documentService: DocumentService,
    private _tenderService: AcquisitionsService,
    private _notificationService: NotificationService,
    private _standardStatusesService: StandadStatusesService,
  ) {
    this.organizationIdentifier = !this._authService.isAdmin() ? this._authService.getUserOrganization()['organization']['identifier'] : '000';
    this.getAllProjects({ q: 'all', relation: 'no-tender', 'organizationID': !this._authService.isAdmin() ? this._authService.getUserOrganization()['organization']['id'] : '' });
    this.getStandardStatuses(2);
  }

  ngOnInit(): void {
    this.setUpAcquisitionForm();
  }



  setUpAcquisitionForm(): void {
    this.acquisitionForm = this.fb.group({
      'project_id': ['', [Validators.required]],
      'process_number': ['', [Validators.required]],
      'process_name': ['', [Validators.required]],
      'tender_method_id': ['', [Validators.required]], // Validators.required
      'contract_type_id': ['', [Validators.required]], // Validators.required
      'bidding_start': ['', []], // Validators.required
      'bidding_end': ['', []], // Validators.required
      'standard_status_id': ['', [Validators.required]],
      'status_id': [(this._authService.isPublisher()) ? this.statuses[0] : '', (!this._authService.isPublisher()) ? [Validators.required] : '']
    });

  }


  openDocumentDialog() {
    const dialogRef = this.dialog.open(AddDocumentDialogComponent, {
      width: '600px',
      height: '908px',
      data: { id: this.savedAcquisitionInfo.data.project_id, section_id: 2 }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllDocuments({ 'projectID': this.savedAcquisitionInfo.data.project_id, 'section': 2 });
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
        this.documents = documents
      },
      (error) => {

      }
    )
  };

  deleteAcquisitionDocument(event: number | string): void {
    this.isRequestLoading = true;
    this.subscription = this._documentService.deleteDocument(event).subscribe(
      (document) => {
        this.isRequestLoading = false;
        this.getAllDocuments({ 'projectID': this.savedAcquisitionInfo.data.project_id, 'section': 2 });
        this._notificationService.showSuccessNotification('Deleted Successfully!', 'Tender Document has been deleted.');
      },
      (error) => {
        this.isRequestLoading = false;
      }
    );
  }

  private _filterStatus(value: any): any {
    let title = value.title || value;
    const filterValue = this._normalizeValue(title);
    return this.statuses.filter(status => this._normalizeValue(status.title).includes(filterValue));
  }

  getProjectDetails(project: IProjectAttributes) {
    this.selectedProject = project;
  }

  saveAcquisition(formValue: FormGroup, stepper: MatStepper) {

    if(this.acquisitionForm.invalid) {
      return;
    }

    let acquisition: ITenderAttributes = {
      'id': '',
      'project_id': formValue.controls.project_id.value.id,
      'identifier': !this._authService.isAdmin() ? this.organizationIdentifier ? this.organizationIdentifier : '000' : formValue.controls.project_id.value.organization.identifier,
      'process_number_standard': formValue.controls.project_id.value.process_number_standard,
      'process_number': formValue.controls.process_number.value,
      'process_name': formValue.controls.process_name.value,
      'status_id': !this._authService.isPublisher() ? formValue.controls.status_id.value.id : this.statuses[0].id,
      'standard_status_id': formValue.controls.standard_status_id.value.id,
      'contract_type_id': Number(formValue.controls.contract_type_id.value),
      'tender_method_id': Number(formValue.controls.tender_method_id.value),
      'bidding_start': formValue.controls.bidding_start.value,
      'bidding_end': formValue.controls.bidding_end.value,
    }

    console.log('Tender ', acquisition);

    this.isRequestLoading = true;

    this.subscription = this._tenderService.addTender(acquisition).subscribe(
      (tender) => {
        this.isRequestLoading = false;
        this.savedAcquisitionInfo = tender;
        console.log('Saved Acquisition ', this.savedAcquisitionInfo);
        this._notificationService.showSuccessNotification('Saved Successfully!', 'Tender has been saved.');
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
    return this.acquisitionForm.get('project_id');
  }

  get processNumber() {
    return this.acquisitionForm.get('process_number');
  }

  get processName() {
    return this.acquisitionForm.get('process_name');
  }

  get tenderMethod() {
    return this.acquisitionForm.get('tender_method_id');
  }

  get contractType() {
    return this.acquisitionForm.get('contract_type_id');
  }

  get standardStatus() {
    return this.acquisitionForm.get('standard_status_id');
  }

  get status() {
    return this.acquisitionForm.get('status_id');
  }

}
