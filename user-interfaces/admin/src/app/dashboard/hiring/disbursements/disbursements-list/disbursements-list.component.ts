import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ILink } from 'src/app/shared/interfaces/link/link';
import { IMeta } from 'src/app/shared/interfaces/meta/meta';
import { environment } from 'src/environments/environment';
import { DisbursementsService } from '../_services/disbursements.service';

@Component({
  selector: 'app-disbursements-list',
  templateUrl: './disbursements-list.component.html',
  styleUrls: ['./disbursements-list.component.scss']
})
export class DisbursementsListComponent implements OnInit {

  apiUrl = environment.apiUrl

  isLoading!: Boolean;
  errorMessage: string = '';

  disbursements$!: Observable<any | null>;

  disbursementSearchForm!: FormGroup;

  links: ILink | undefined;
  meta: IMeta | undefined;

  nextPageNavigation: any;
  previousPageNavigation: any;

  currentPage: any;
  lastPage: any;

  constructor(
    private fb: FormBuilder,
    private _disbursementService: DisbursementsService,
  ) { }

  ngOnInit(): void {
    this.getAllDisbursements('', '');
    this.setUpDisbursementSearchForm();
  }

  setUpDisbursementSearchForm(): void {
    this.disbursementSearchForm = this.fb.group({
      'searchQuery': ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  searchDisbursements(query: FormGroup) {
    let searchQuery = query.controls.searchQuery.value;
    let searchUrl = `${this.apiUrl}/disbursements?disbursement_code=${searchQuery}`;
    this.getAllDisbursements(searchUrl, '');
  }

  clearSearch(): void {
    this.getAllDisbursements('', '');
    this.searchQuery?.setValue(null);
  }

  getAllDisbursements(url: string, queryAll: string) {
    this.isLoading = true;
    this.disbursements$ = this._disbursementService.getAllDisbursements(url, '').pipe(
      tap(
        data => {
          this.isLoading = false;

          this.links = data?.link;
          this.meta = data?.meta;

          this.nextPageNavigation  = this.links?.next;
          this.previousPageNavigation = this.links?.prev;

          this.currentPage = this.meta?.current_page;
          this.lastPage = this.meta?.last_page;

        }
      ),
      catchError(error => {
        this.isLoading = false;
        this.errorMessage = error;
        console.log(this.errorMessage);
        return of(null);
      }));
  }

  confirmDelete(id?: string | number) {

  }

  get searchQuery() {
    return this.disbursementSearchForm.get('searchQuery');
  }

}
