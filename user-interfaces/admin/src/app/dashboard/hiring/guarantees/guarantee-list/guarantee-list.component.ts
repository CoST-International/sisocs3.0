import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ILink } from 'src/app/shared/interfaces/link/link';
import { IMeta } from 'src/app/shared/interfaces/meta/meta';
import { environment } from 'src/environments/environment';
import { GuaranteesService } from '../_services/guarantees.service';

@Component({
  selector: 'app-guarantee-list',
  templateUrl: './guarantee-list.component.html',
  styleUrls: ['./guarantee-list.component.scss']
})
export class GuaranteeListComponent implements OnInit {

  apiUrl = environment.apiUrl

  isLoading!: Boolean;
  errorMessage: string = '';

  guarantees$!: Observable<any | null>;

  guaranteeSearchForm!: FormGroup;

  links: ILink | undefined;
  meta: IMeta | undefined;

  nextPageNavigation: any;
  previousPageNavigation: any;

  currentPage: any;
  lastPage: any;

  constructor(
    private fb: FormBuilder,
    private _guaranteesService: GuaranteesService,
  ) { }

  ngOnInit(): void {
    this.getAllGuarantees('', '');
    this.setUpGuaranteeSearchForm();
  }

  setUpGuaranteeSearchForm(): void {
    this.guaranteeSearchForm = this.fb.group({
      'searchQuery': ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  searchGuarantees(query: FormGroup) {
    let searchQuery = query.controls.searchQuery.value;
    let searchUrl = `${this.apiUrl}/guarantees?guarantee_code=${searchQuery}`;
    this.getAllGuarantees(searchUrl, '');
  }

  clearSearch(): void {
    this.getAllGuarantees('', '');
    this.searchQuery?.setValue(null);
  }

  getAllGuarantees(url: string, queryAll: string) {
    this.isLoading = true;
    this.guarantees$ = this._guaranteesService.getAllGuarantees(url, '').pipe(
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
    return this.guaranteeSearchForm.get('searchQuery');
  }

}
