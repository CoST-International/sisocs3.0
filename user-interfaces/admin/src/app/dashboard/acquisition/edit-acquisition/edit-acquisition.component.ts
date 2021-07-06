import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { AddDocumentDialogComponent } from 'src/app/shared/dialogs/add-document-dialog/add-document-dialog.component';
import { IDocument, IDocumentData } from 'src/app/shared/interfaces/documents/IDocument';
import { IProjectData, IProjectAttributes } from 'src/app/shared/interfaces/project/IProject';
import { IQueryparam } from 'src/app/shared/interfaces/queryparam/IQueryparam';
import { IStandardstatusAttributes } from 'src/app/shared/interfaces/standardstatus/IStandardstatus';
import { ITender, ITenderAttributes } from 'src/app/shared/interfaces/tender/ITender';
import { DecryptService } from 'src/app/shared/services/decrypt/decrypt.service';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { StandadStatusesService } from 'src/app/shared/services/standard-status/standad-statuses.service';
import { DocumentService } from '../../documents/_services/document.service';
import { ProjectService } from '../../project/_services/project.service';
import { AcquisitionsService } from '../_services/acquisitions.service';

@Component({
  selector: 'app-edit-acquisition',
  templateUrl: './edit-acquisition.component.html',
  styleUrls: ['./edit-acquisition.component.scss']
})
export class EditAcquisitionComponent implements OnDestroy {

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
  tenderId!: number | string;
  tender!: ITenderAttributes;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public _authService: AuthService,
    private _projectService: ProjectService,
    private _decryptService: DecryptService,
    private _documentService: DocumentService,
    private _tenderService: AcquisitionsService,
    private _notificationService: NotificationService,
    private _standardStatusesService: StandadStatusesService,
  ) {
    this.subscription = this.route.params.subscribe((params) => {
      this.tenderId = this._decryptService.decrypt(params['id']);
    });

    this.getTenderById(this.tenderId);
  }

  setUpAcquisitionForm(tender: ITenderAttributes): void {
    this.acquisitionForm = this.fb.group({
      'project_id': [tender?.project?.data[0] ? tender?.project?.data[0] : '', [Validators.required]],
      'process_number': [tender?.process_number ? tender?.process_number : '', [Validators.required]],
      'process_name': [tender?.process_name ? tender?.process_name : '', [Validators.required]],
      'tender_method_id': [tender?.tender_method_id ? tender?.tender_method_id : '', [Validators.required]],
      'contract_type_id': [tender?.contract_type_id ? tender?.contract_type_id : '', [Validators.required]],
      'bidding_start': [tender?.bidding_start ? tender?.bidding_start : '', []],
      'bidding_end': [tender?.bidding_end ? tender?.bidding_end : '', []],
      'standard_status_id': [tender?.standard_status_id ? tender?.standard_status_id : '', [Validators.required]],
      'status_id': [tender?.status_id ? tender?.status_id : (this._authService.isPublisher()) ? this.statuses[0] : '', (!this._authService.isPublisher()) ? [Validators.required] : '']
    });
  }

  openDocumentDialog() {
    const dialogRef = this.dialog.open(AddDocumentDialogComponent, {
      width: '600px',
      height: '908px',
      data: { id: this.tender.project_id, section_id: 2 }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllDocuments({ 'projectID': this.tender.project_id, 'section': 2 });
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
        console.log('Standard Statuses', this.standardStatuses);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }

  getTenderById(id: string | number): void {
    this.isLoading = true;
    this.subscription = this._tenderService.getTenderById(id).subscribe(
      (tender) => {
        this.isLoading = false;
        this.tender = tender.data;
        console.log('Tender Details ', this.tender);
        this.setUpAcquisitionForm(this.tender);
        this.getAllProjects({ q: 'all', relation: 'prequalification' });
        this.getStandardStatuses(2);
        this.getAllDocuments({ 'projectID': this.tender.project_id, 'section': 2 });
      },
      (error) => {
        this.isLoading = false;
      }
    )
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

  getProjectDetails(project: IProjectAttributes) {
    this.selectedProject = project;
  }

  updateAcquisition(formValue: FormGroup, stepper: MatStepper) {

    if(this.acquisitionForm.invalid) {
      return;
    }

    let acquisition: ITenderAttributes = {
      'id': '',
      'project_id': formValue.controls.project_id.value.id,
      'process_number_standard': formValue.controls.project_id.value.process_number_standard,
      'process_number': formValue.controls.process_number.value,
      'process_name': formValue.controls.process_name.value,
      'status_id': formValue.controls.status_id.value,
      'standard_status_id': formValue.controls.standard_status_id.value,
      'contract_type_id': Number(formValue.controls.contract_type_id.value),
      'tender_method_id': Number(formValue.controls.tender_method_id.value),
      'bidding_start': formValue.controls.bidding_start.value,
      'bidding_end': formValue.controls.bidding_end.value,
      'organization_id': formValue.controls.project_id.value.organization_id,
      'organization_unit_id': formValue.controls.project_id.value.organization_unit_id
    }

    this.isRequestLoading = true;

    this.subscription = this._tenderService.updateTender(acquisition, this.tenderId).subscribe(
      (tender) => {
        this.isRequestLoading = false;
        this._notificationService.showSuccessNotification('Updated Successfully!', 'Tender has been updated.');
        this.getAllDocuments({ 'projectID': this.tender.project_id, 'section': 2 });
        this.nextLocation(stepper);
      },
      (error) => {
        this.isRequestLoading = false;
        this._notificationService.showSuccessNotification('Update Failure!', 'Tender has failed to update.');
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
