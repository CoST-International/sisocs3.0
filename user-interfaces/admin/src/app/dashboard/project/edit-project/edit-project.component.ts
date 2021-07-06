import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { TooltipPosition } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { AddDocumentDialogComponent } from 'src/app/shared/dialogs/add-document-dialog/add-document-dialog.component';
import { IDocument, IDocumentData } from 'src/app/shared/interfaces/documents/IDocument';
import { ILocation } from 'src/app/shared/interfaces/location/ILocation';
import { IOc4idsSectorAttributes } from 'src/app/shared/interfaces/oc4ids-sector/IOc4idssector';
import { IOfficialAttributes } from 'src/app/shared/interfaces/official/IOfficial';
import { IOrganization, IOrganizationData } from 'src/app/shared/interfaces/organization/IOrganization';
import { IProject, IProjectAttributes } from 'src/app/shared/interfaces/project/IProject';
import { IPurposeAttributes } from 'src/app/shared/interfaces/Purpose/IPurpose';
import { IQueryparam } from 'src/app/shared/interfaces/queryparam/IQueryparam';
import { IStandardstatusAttributes } from 'src/app/shared/interfaces/standardstatus/IStandardstatus';
import { ISubsectorAttributes } from 'src/app/shared/interfaces/subsector/ISubsector';
import { DecryptService } from 'src/app/shared/services/decrypt/decrypt.service';
import { LocationService } from 'src/app/shared/services/location/location.service';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { StandadStatusesService } from 'src/app/shared/services/standard-status/standad-statuses.service';
import { EntitiesService } from '../../catalog/entities/_services/entities.service';
import { OfficialsService } from '../../catalog/officials/_services/officials.service';
import { PurposesService } from '../../catalog/purpose/_services/purposes.service';
import { SectorsService } from '../../catalog/sectors/_services/sectors.service';
import { SubsectorsService } from '../../catalog/sub-sectors/_services/subsectors.service';
import { DocumentService } from '../../documents/_services/document.service';
import { AddLocationDialogComponent } from '../add-location-dialog/add-location-dialog.component';
import { ProjectService } from '../_services/project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnDestroy {

  isLoading: boolean = false;
  isRequestLoading: boolean = false;
  errorMessage: string = '';

  projectId!: number | string;
  savedProjectInfo!: IProjectAttributes;

  projectForm!: FormGroup;
  locationFormStep!: FormGroup;
  documentFormStep!: FormGroup;

  project!: IProjectAttributes;
  locations!: ILocation;
  documents!: IDocumentData;
  organizations!: IOrganizationData;
  purposes!: IPurposeAttributes[];
  officials!: IOfficialAttributes[];
  subSectors!: ISubsectorAttributes[];
  oc4idsSectors!: IOc4idsSectorAttributes[];
  standardStatuses!: IStandardstatusAttributes[];


  filteredSectors: any;
  filteredPurposes: any;
  filteredStatuses: any;
  filteredSubsectors: any;
  filteredOc4idssectors: any;
  filteredStandardstatuses: any;
  filteredResponsibleAuthoriry: any;
  filteredResponsibleIndividuals: any;

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];

  statuses = [
    { id: 1, status_name: 'BORRADOR' },
    { id: 2, status_name: 'PUBLICADO' },
    { id: 3, status_name: 'REVISIÓN' },
    { id: 4, status_name: 'No Definido' },
  ];

  subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public _authService: AuthService,
    private _decryptService: DecryptService,
    private _sectorsService: SectorsService,
    private _projectService: ProjectService,
    private _locationService: LocationService,
    private _documentService: DocumentService,
    private _entitiesServices: EntitiesService,
    private _purposesServices: PurposesService,
    private _officialsService: OfficialsService,
    private _subSectorsService: SubsectorsService,
    private _notificationService: NotificationService,
    private _standardStatusesService: StandadStatusesService,
  ) {

    this.subscription = this.route.params.subscribe((params) => {
      this.projectId = this._decryptService.decrypt(params['id']);
    });

    this.getProjectById(this.projectId);
  }

  private _filter(value: any): any[] {
    let name = value.organization_name || value;

    return this.organizations?.data.filter(option => option.organization_name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  private _filterAuthority(value: any): any[] {
    let name = value.official_name || value;

    return this.officials?.filter(option => option.official_name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  private _filterPurpose(value: any): any[] {
    let title = value.purpose_name || value;

    return this.purposes?.filter(option => option.purpose_name.toLowerCase().indexOf(title.toLowerCase()) === 0);
  }

  private _filterSectors(value: any): any[] {
    let title = value.title || value;

    return this.oc4idsSectors?.filter(option => option.title.toLowerCase().indexOf(title.toLowerCase()) === 0);
  }

  private _filterSubsectors(value: any): any[] {
    let title = value.subsector_name || value;

    return this.subSectors?.filter(option => option.subsector_name.toLowerCase().indexOf(title.toLowerCase()) === 0);
  }

  private _filterStandardstatuses(value: any): any {
    let title = value.name_local || value;

    const filterValue = this._normalizeValue(title);
    return this.standardStatuses?.filter(standardStatus => this._normalizeValue(standardStatus.name_local).includes(filterValue));
  }

  private _filterStatus(value: any): any {
    let title = value.status_name || value;
    const filterValue = this._normalizeValue(title);
    return this.statuses.filter(status => this._normalizeValue(status.status_name).includes(filterValue));
  }

  private _normalizeValue(value: any): any {
    return value.toLowerCase().replace(/\s/g, '');
  }


  setUpProjectForm(project: IProjectAttributes): void {
    this.projectForm = this.fb.group({
      'project_code': [project?.project_code ? project?.project_code : '', [Validators.required]],
      'project_code_sefin': [project?.project_code_sefin ? project?.project_code_sefin : '', [Validators.required]],
      'project_name': [project?.project_name ? project?.project_name : '', [Validators.required, Validators.minLength(5)]],
      'project_description': [project?.project_description ? project?.project_description : '', [Validators.required]],
      'organization_id': [project?.organization_id ? project?.organization: '', [Validators.required]],
      'official_id': [project?.official_id ? project?.official : '', [Validators.required]],
      'purpose_id': [project?.purpose_id ? project?.purpose: '', [Validators.required]],
      'sector_id': [project?.oc4idsSector ? project?.oc4idsSector : '', [Validators.required]],
      'sub_sector_id': [project?.subsector_id ? project?.subSector : '', [Validators.required]],
      'standard_status_id': [project?.standard_status_id ? project?.standardStatus : '', [Validators.required]],
      'status_id': [project?.status ? project?.status : (this._authService.isPublisher()) ? this.statuses[0] : '', (!this._authService.isPublisher()) ? [Validators.required] : '']
    });

  }

  updateProject(formValue: FormGroup, stepper: MatStepper) {

    if(this.projectForm.invalid) {
      return;
    }

    let project: IProjectAttributes = {
      'id': this.projectId,
      'sector_id': formValue.controls.sector_id.value.id,
      'status_id': formValue.controls.status_id.value.id,
      'purpose_id': formValue.controls.purpose_id.value.id,
      'project_code': formValue.controls.project_code.value,
      'project_name': formValue.controls.project_name.value,
      'official_id': formValue.controls.official_id.value.id,
      'subsector_id': formValue.controls.sub_sector_id.value.id,
      'organization_id': formValue.controls.organization_id.value.id,
      'project_code_sefin': formValue.controls.project_code_sefin.value,
      'project_description': formValue.controls.project_description.value,
      'standard_status_id': formValue.controls.standard_status_id.value.id,
    }

    this.isRequestLoading = true;

    this.subscription = this._projectService.updateProject(project, this.projectId).subscribe(
      (project) => {
        this.isRequestLoading = false;
        this.savedProjectInfo = project;
        this._notificationService.showSuccessNotification('Saved Successfully!', 'Project has been saved.');
        this.nextLocation(stepper);
        this.getAllLocations({ 'projectID': this.projectId });
        this.getAllDocuments({ 'projectID': this.projectId, 'section': 8 });
      },
      (error) => {
        this.isRequestLoading = false;
      }
    )

  }

  openLocationDialog() {
    const dialogRef = this.dialog.open(AddLocationDialogComponent, {
      width: '600px',
      height: 'auto',
      data: this.project
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllLocations({ 'projectID': this.projectId });
    });
  }

  openDocumentDialog() {
    const dialogRef = this.dialog.open(AddDocumentDialogComponent, {
      width: '600px',
      height: 'auto',
      data: { id: this.project?.id, section_id: 8 }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllDocuments({ 'projectID': this.projectId, 'section': 8 });
    });
  }

  displayState(state: any) {
    return state ? state.organization_name : '';
  }

  displayStateAuthority(state: any) {
    return state ? state.official_name : '';
  }

  displayStatePurpose(state: any) {
    return state ? state.purpose_name : '';
  }

  displayStateSector(state: any) {
    return state ? state.title : '';
  }

  displayStateSubsector(state: any) {
    return state ? state.subsector_name : '';
  }
  displayStateStandardstatus(state: any) {
    return state ? state.name_local : '';
  }

  displayStateStatus(state: any) {
    return state ? state.status_name : '';
  }

  nextLocation(stepper: MatStepper) {
    stepper.next();
  }

  getOrganizations() {
    this.isLoading = true;
    this.subscription = this._entitiesServices.getAllEntities({page: 1, limit: 20}).subscribe(
      (entities) => {
        this.isLoading = false;
        this.organizations = entities;

        this.filteredResponsibleIndividuals = this.projectForm.get('organization_id')?.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }
  getOfficials() {
    this.isLoading = true;
    let queryParams = {q: 'all'};
    this.subscription = this._officialsService.getAllOfficials(queryParams).subscribe(
      (officials) => {
        this.isLoading = false;
        this.officials = officials?.data;
        this.filteredResponsibleAuthoriry = this.projectForm.get('official_id')?.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterAuthority(value))
        );
        console.log('Officials ', this.officials);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }
  getPurposes() {
    this.isLoading = true;
    let queryParams = {q: 'all'};
    this.subscription = this._purposesServices.getAllPurposes(queryParams).subscribe(
      (purposes) => {
        this.isLoading = false;
        this.purposes = purposes?.data;
        this.filteredPurposes = this.projectForm.get('purpose_id')?.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterPurpose(value))
        );
        console.log('Officials ', this.officials);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }
  getSectors() {
    this.isLoading = true;
    let queryParams = {q: 'all'};
    this.subscription = this._sectorsService.getAllSectors(queryParams).subscribe(
      (oc4idsSectors) => {
        this.isLoading = false;
        this.oc4idsSectors = oc4idsSectors?.data;
        this.filteredOc4idssectors= this.projectForm.get('sector_id')?.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterSectors(value))
        );
        console.log('Sectors', this.oc4idsSectors);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }
  getSubsectors() {
    this.isLoading = true;
    let queryParams = {q: 'all'};
    this.subscription = this._subSectorsService.getAllSubsectors(queryParams).subscribe(
      (subsectors) => {
        this.isLoading = false;
        this.subSectors = subsectors?.data;
        this.filteredSubsectors = this.projectForm.get('sub_sector_id')?.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterSubsectors(value))
        );
        console.log('Subsectors', this.subSectors);
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
        this.filteredStandardstatuses = this.projectForm.get('standard_status_id')?.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterStandardstatuses(value))
        );
        !this._authService.isPublisher() ? this.getStatuses() : '';
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }

  getStatuses() {
    this.filteredStatuses = this.projectForm.get('status_id')?.valueChanges.pipe(
      startWith(''),
      map(value => this._filterStatus(value))
    );
  }
  getAllLocations(query: IQueryparam): void {
    this.isLoading = true;
    this.subscription = this._locationService.getAllLocations(query).subscribe(
      (location) => {
        this.isLoading = false;
        this.locations = location
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
        console.log('Documents', this.documents);
      },
      (error) => {
        this.isLoading = false;
      }
    )
  };

  getProjectById(id: string | number): void {
    this.isLoading = true;
    this.subscription = this._projectService.getProjectById(id).subscribe(
      (project) => {
        this.isLoading = false;
        this.project = project.data;
        console.log('Project Details ', this.project);
        this.setUpProjectForm(this.project);
        this.getAllLocations({ 'projectID': this.projectId });
        this.getAllDocuments({ 'projectID': this.projectId, 'section': 8 });
        this.getOrganizations();
        this.getOfficials();
        this.getPurposes();
        this.getSectors();
        this.getSubsectors();
        this.getStandardStatuses(1); // Hard Coded 1 Cause First Stage of OC4IDS - Identitification
      },
      (error) => {
        this.isLoading = false;
      }
    )
  }

  deleteProjectLocation(event: number | string): void {
    this.isRequestLoading = true;
    this.subscription = this._locationService.deleteLocation(event).subscribe(
      (location) => {
        this.isRequestLoading = false;
        this.getAllLocations({ 'projectID': this.projectId });
        this._notificationService.showSuccessNotification('Deleted Successfully!', 'Project Location has been deleted.');
      },
      (error) => {
        this.isRequestLoading = false;
      }
    );
  }

  deleteProjectDocument(event: number | string): void {
    this.isRequestLoading = true;
    this.subscription = this._documentService.deleteDocument(event).subscribe(
      (document) => {
        this.isRequestLoading = false;
        this.getAllDocuments({ 'projectID': this.projectId, 'section': 8 });
        this._notificationService.showSuccessNotification('Deleted Successfully!', 'Project Document has been deleted.');
      },
      (error) => {
        this.isRequestLoading = false;
      }
    );
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get referenceNumber() {
    return this.projectForm.get('project_code');
  }

  get bipCode() {
    return this.projectForm.get('project_code_sefin');
  }

  get projectName() {
    return this.projectForm.get('project_name');
  }

  get projectDescription() {
    return this.projectForm.get('project_description');
  }

  get responsibleOrganization() {
    return this.projectForm.get('organization_id');
  }

  get responsibleAuthority() {
    return this.projectForm.get('official_id');
  }

  get purpose() {
    return this.projectForm.get('purpose_id');
  }

  get sector() {
    return this.projectForm.get('sector_id');
  }

  get subSector() {
    return this.projectForm.get('sub_sector_id');
  }

  get standardStatus() {
    return this.projectForm.get('standard_status_id');
  }

  get status() {
    return this.projectForm.get('status_id');
  }

}
