import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AddBiddersDialogComponent } from '../add-bidders-dialog/add-bidders-dialog.component';
import { AddDocumentDialogComponent } from 'src/app/shared/dialogs/add-document-dialog/add-document-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { map, startWith } from 'rxjs/operators';
import { IDocument, IDocumentData } from 'src/app/shared/interfaces/documents/IDocument';
import { IProjectAttributes, IProjectData } from 'src/app/shared/interfaces/project/IProject';
import { IAward, IAwardAttributes } from 'src/app/shared/interfaces/award/IAward';
import { IStandardstatusAttributes } from 'src/app/shared/interfaces/standardstatus/IStandardstatus';
import { Subscription } from 'rxjs';
import { AwardService } from '../_services/award.service';
import { ProjectService } from '../../project/_services/project.service';
import { DocumentService } from '../../documents/_services/document.service';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { StandadStatusesService } from 'src/app/shared/services/standard-status/standad-statuses.service';
import { IQueryparam } from 'src/app/shared/interfaces/queryparam/IQueryparam';
import { CurrencyService } from 'src/app/shared/services/currency/currency.service';
import { ICurrency } from 'src/app/shared/interfaces/currency/ICurrency';
import { TenderOffererService } from 'src/app/shared/services/tender-offerer/tender-offerer.service';
import { ITenderOfferer, ITenderOffererData } from 'src/app/shared/interfaces/tender-offerer/TenderOfferer';
import { IContractMethod } from 'src/app/shared/interfaces/contract-methods/IContractMethods';
import { ITenderMethod, ITenderMethodData } from '../../../shared/interfaces/tender-methods/ITenderMethod';
import { TenderMethodsService } from 'src/app/shared/services/tender-methods/tender-methods.service';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { IAwardMethodData } from 'src/app/shared/interfaces/award-methods/IAwardMethods';
import { AwardMethodService } from 'src/app/shared/services/award-method/award-method.service';

@Component({
  selector: 'app-new-award',
  templateUrl: './new-award.component.html',
  styleUrls: ['./new-award.component.scss']
})


export class NewAwardComponent implements OnInit, OnDestroy {

  errorMessage: string = '';
  isLoading: boolean = false;
  isRequestLoading: boolean = false;

  awardForm!: FormGroup;
  biddersFormStep!: FormGroup;
  documentFormStep!: FormGroup;


  documents!: IDocumentData;
  currencies!: ICurrency;
  projects!: IProjectData;
  savedAwardInfo!: IAward;
  awardMethods!: IAwardMethodData;
  tenderOfferers!: ITenderOffererData;
  selectedProject!: IProjectAttributes;
  standardStatuses!: IStandardstatusAttributes[];

  filteredStatuses: any;
  filteredProjects: any;
  filteredStandardstatuses: any;

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
    private _awardService: AwardService,
    private _projectService: ProjectService,
    private _currencyService: CurrencyService,
    private _documentService: DocumentService,
    private _awardMethodService: AwardMethodService,
    private _notificationService: NotificationService,
    private _tenderOffererService: TenderOffererService,
    private _tenderMethodsService: TenderMethodsService,
    private _standardStatusesService: StandadStatusesService,
  ) {
    this.organizationIdentifier = !this._authService.isAdmin() ? this._authService.getUserOrganization()['organization']['identifier'] : '000';
    this.getAllProjects({ q: 'all', relation: 'tender', 'organizationID': !this._authService.isAdmin() ? this._authService.getUserOrganization()['organization']['id'] : ''  });
    this.getStandardStatuses(3);
    this.getCurrencies();
    this.getAwardMethods();
  }

  ngOnInit(): void {
    this.setUpAwardForm();
  }

  setUpAwardForm(): void {
    this.awardForm = this.fb.group({
      'project_id': ['', [Validators.required]],
      'process_number': ['', [Validators.required]],
      'currency_id': ['', [Validators.required]],
      'estimated_cost': ['', [Validators.required]],
      'award_creteria': ['', [Validators.required]],
      'award_start': ['', []],
      'award_end': ['', []],
      'standard_status_id': ['', [Validators.required]],
      'status_id': [(this._authService.isPublisher()) ? this.statuses[0] : '', (!this._authService.isPublisher()) ? [Validators.required] : '']
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

  getAllTenderOfferers(query: IQueryparam): void {
    this.isLoading = true;
    this.subscription = this._tenderOffererService.getAllTenderOfferers(query).subscribe(
      (tenderOfferer) => {
        this.isLoading = false;
        this.tenderOfferers = tenderOfferer;
      },
      (error) => {
        this.isLoading = false;
      }
    )
  };

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

  getAwardMethods() {
    this.isLoading = true;
    this.subscription = this._awardMethodService.getAllAwardMethods({page: 1, limit: 20}).subscribe(
      (methods) => {
        this.isLoading = false;
        this.awardMethods = methods;
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }

  deleteAwardDocument(event: number | string): void {
    this.isRequestLoading = true;
    this.subscription = this._documentService.deleteDocument(event).subscribe(
      (document) => {
        this.isRequestLoading = false;
        this.getAllDocuments({ 'projectID': this.savedAwardInfo.data.project_id, 'section': 3 });
        this._notificationService.showSuccessNotification('Deleted Successfully!', 'Award Document has been deleted.');
      },
      (error) => {
        this.isRequestLoading = false;
      }
    );
  }

  deleteTenderOfferer(event: number | string): void {
    this.isRequestLoading = true;
    this.subscription = this._tenderOffererService.deleteTenderOfferer(event).subscribe(
      (tenderOfferer) => {
        this.isRequestLoading = false;
        this.getAllTenderOfferers({ 'tenderID': this.savedAwardInfo.data.tender_id });
        this._notificationService.showSuccessNotification('Deleted Successfully!', 'Tender Offerer has been deleted.');
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


  saveAward(formValue: FormGroup, step: MatStepper) {

    if(this.awardForm.invalid) {
      return;
    }

    let award: IAwardAttributes = {
      'id': '',
      'identifier': !this._authService.isAdmin() ? this.organizationIdentifier ? this.organizationIdentifier : '000' : formValue.controls.project_id.value.organization.identifier,
      'process_number_standard': formValue.controls.project_id.value.process_number_standard,
      'process_number': formValue.controls.process_number.value,
      'contract_estimated_cost': formValue.controls.estimated_cost.value,
      'currency_id': formValue.controls.currency_id.value,
      'tender_id': this.selectedProject?.tender?.id ? this.selectedProject?.tender?.id : '',
      'award_method_id': Number(formValue.controls.award_creteria.value),
      // 'contract_method_id': formValue.controls.contract_method_id.value,
      'status_id': !this._authService.isPublisher() ? formValue.controls.status_id.value.id : this.statuses[0].id,
      'standard_status_id': formValue.controls.standard_status_id.value.id,
      'project_id': formValue.controls.project_id.value.id,
      'award_start': formValue.controls.award_start.value,
      'award_end': formValue.controls.award_end.value,
      'ocds_id': this.selectedProject?.tender?.ocds_id
    }

    console.log('Award ', award);

    this.isRequestLoading = true;

    this.subscription = this._awardService.addAward(award).subscribe(
      (award) => {
        this.isRequestLoading = false;
        this.savedAwardInfo = award;
        console.log('Saved Award ', this.savedAwardInfo);
        this._notificationService.showSuccessNotification('Saved Successfully!', 'Award has been saved.');
        this.nextLocation(step);
      },
      (error) => {
        this.isRequestLoading = false;
      }
    )
  }

  openBiddersDialog() {
    const dialogRef = this.dialog.open(AddBiddersDialogComponent, {
      width: '600px',
      height: '320px',
      data: { id: this.savedAwardInfo.data.tender_id, section_id: 3, status_id: this.savedAwardInfo.data.status_id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllTenderOfferers({ 'tenderID': this.savedAwardInfo.data.tender_id });
      console.log('The dialog was closed', result);
    });
  }

  openDocumentDialog() {
    const dialogRef = this.dialog.open(AddDocumentDialogComponent, {
      width: '600px',
      height: '908px',
      data: { id: this.savedAwardInfo.data.project_id, section_id: 3 }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllDocuments({ 'projectID': this.savedAwardInfo.data.project_id, 'section': 3 });
      console.log('The dialog was closed', result);
    });
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
    return this.awardForm.get('project_id');
  }

  get processNumber() {
    return this.awardForm.get('process_number');
  }

  get currency() {
    return this.awardForm.get('currency_id');
  }

  get estimatedCost() {
    return this.awardForm.get('estimated_cost')
  }

  get awardCreteria() {
    return this.awardForm.get('award_creteria');
  }

  get standardStatus() {
    return this.awardForm.get('standard_status_id');
  }

  get status() {
    return this.awardForm.get('status_id');
  }

}
