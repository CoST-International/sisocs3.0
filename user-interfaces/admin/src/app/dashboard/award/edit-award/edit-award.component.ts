import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AddDocumentDialogComponent } from 'src/app/shared/dialogs/add-document-dialog/add-document-dialog.component';
import { IAwardMethodData } from 'src/app/shared/interfaces/award-methods/IAwardMethods';
import { IAward, IAwardAttributes } from 'src/app/shared/interfaces/award/IAward';
import { ICurrency } from 'src/app/shared/interfaces/currency/ICurrency';
import { IDocument, IDocumentData } from 'src/app/shared/interfaces/documents/IDocument';
import { IProjectData, IProjectAttributes } from 'src/app/shared/interfaces/project/IProject';
import { IQueryparam } from 'src/app/shared/interfaces/queryparam/IQueryparam';
import { IStandardstatusAttributes } from 'src/app/shared/interfaces/standardstatus/IStandardstatus';
import { ITenderMethodData } from 'src/app/shared/interfaces/tender-methods/ITenderMethod';
import { ITenderOffererData } from 'src/app/shared/interfaces/tender-offerer/TenderOfferer';
import { AwardMethodService } from 'src/app/shared/services/award-method/award-method.service';
import { CurrencyService } from 'src/app/shared/services/currency/currency.service';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { StandadStatusesService } from 'src/app/shared/services/standard-status/standad-statuses.service';
import { TenderMethodsService } from 'src/app/shared/services/tender-methods/tender-methods.service';
import { TenderOffererService } from 'src/app/shared/services/tender-offerer/tender-offerer.service';
import { DocumentService } from '../../documents/_services/document.service';
import { ProjectService } from '../../project/_services/project.service';
import { AddBiddersDialogComponent } from '../add-bidders-dialog/add-bidders-dialog.component';
import { AwardService } from '../_services/award.service';
import { ActivatedRoute } from '@angular/router';
import { DecryptService } from 'src/app/shared/services/decrypt/decrypt.service';
import { AuthService } from 'src/app/auth/_services/auth.service';

@Component({
  selector: 'app-edit-award',
    templateUrl: './edit-award.component.html',
  styleUrls: ['./edit-award.component.scss']
})
export class EditAwardComponent implements OnDestroy {

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
  tenderMethods!: ITenderMethodData;
  tenderOfferers!: ITenderOffererData;
  selectedProject!: IProjectAttributes;
  standardStatuses!: IStandardstatusAttributes[];

  filteredProjects: any;

  statuses = [
    { id: 1, title: 'BORRADOR' },
    { id: 2, title: 'PUBLICADO' },
    { id: 3, title: 'REVISIÓN' },
    { id: 4, title: 'No Definido' },
  ];

  subscription!: Subscription;

  awardId!: number | string;
  award!: IAwardAttributes;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public _authService: AuthService,
    private _awardService: AwardService,
    private _projectService: ProjectService,
    private _decryptService: DecryptService,
    private _currencyService: CurrencyService,
    private _documentService: DocumentService,
    private _awardMethodService: AwardMethodService,
    private _notificationService: NotificationService,
    private _tenderOffererService: TenderOffererService,
    private _tenderMethodsService: TenderMethodsService,
    private _standardStatusesService: StandadStatusesService,
  ) {
    this.subscription = this.route.params.subscribe((params) => {
      this.awardId = this._decryptService.decrypt(params['id']);
    });
    this.getAwardById(this.awardId);
  }

  setUpAwardForm(award: IAwardAttributes): void {
    this.awardForm = this.fb.group({
      'project_id': [award?.project ? award?.project : '', [Validators.required]],
      'process_number': [award?.process_number ? award?.process_number : '', [Validators.required]],
      'currency_id': [award?.currency_id ? award?.currency_id : '', [Validators.required]],
      'estimated_cost': [award?.contract_estimated_cost ? award?.contract_estimated_cost : '', [Validators.required]],
      'award_creteria': [award?.award_method_id ? award?.award_method_id : '', [Validators.required]],
      'award_start': [award?.award_start ? award?.award_start : '', []],
      'award_end': [award?.award_end ? award?.award_end : '', []],
      'standard_status_id': [award?.standard_status_id ? award?.standard_status_id : '', [Validators.required]],
      'status_id': [award?.status_id ? award?.status_id : '', [Validators.required]]
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

  getTenderMethods() {
    this.isLoading = true;
    this.subscription = this._tenderMethodsService.getAllTendermethods({page: 1, limit: 20}).subscribe(
      (methods) => {
        this.isLoading = false;
        this.tenderMethods = methods;
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

  getAwardById(id: string | number): void {
    this.isLoading = true;
    this.subscription = this._awardService.getAwardById(id).subscribe(
      (award) => {
        this.isLoading = false;
        this.award = award.data;
        console.log('Award Details ', this.award);
        this.setUpAwardForm(this.award);
        this.getAllProjects({ q: 'all', relation: 'tender' });
        this.getStandardStatuses(3);
        this.getCurrencies();
        this.getAwardMethods();
      },
      (error) => {
        this.isLoading = false;
      }
    )
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

  getProjectDetails(project: IProjectAttributes) {
    this.selectedProject = project;
  }


  updateAward(formValue: FormGroup, step: MatStepper) {

    if(this.awardForm.invalid) {
      return;
    }

    let award: IAwardAttributes = {
      'id': '',
      'process_number_standard': formValue.controls.project_id.value.process_number_standard,
      'process_number': formValue.controls.process_number.value,
      'contract_estimated_cost': formValue.controls.estimated_cost.value,
      'currency_id': Number(formValue.controls.currency_id.value),
      'tender_id': this.award.tender_id,
      'award_method_id': Number(formValue.controls.award_creteria.value),
      // 'contract_method_id': formValue.controls.contract_method_id.value,
      'status_id': formValue.controls.status_id.value,
      'standard_status_id': formValue.controls.standard_status_id.value,
      'project_id': formValue.controls.project_id.value.id,
      'award_start': formValue.controls.award_start.value,
      'award_end': formValue.controls.award_end.value
    }

    console.log('Award ', award);

    this.isRequestLoading = true;

    this.subscription = this._awardService.updateAward(award, this.awardId).subscribe(
      (award) => {
        this.isRequestLoading = false;
        this._notificationService.showSuccessNotification('Updated Successfully!', 'Award has been updated.');
        this.getAllTenderOfferers({ 'tenderID': this.award.tender_id });
        this.getAllDocuments({ 'projectID': this.award.project_id, 'section': 3 });
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
    return state ? `${state.process_number_standard} - ${state.project_name}` : '';
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
