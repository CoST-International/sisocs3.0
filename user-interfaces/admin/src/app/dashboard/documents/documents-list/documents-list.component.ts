import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { DocumentService } from '../_services/document.service';
import { ILink } from 'src/app/shared/interfaces/link/link';
import { IMeta } from 'src/app/shared/interfaces/meta/meta';
import { IQueryparam } from '../../../shared/interfaces/queryparam/IQueryparam';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.scss']
})
export class DocumentsListComponent implements OnInit {

  apiUrl = environment.apiUrl

  isLoading!: Boolean;
  errorMessage: string = '';

  documents$!: Observable<any | null>;

  documentSearchForm!: FormGroup;

  links: ILink | undefined;
  meta: IMeta | undefined;

  nextPageNavigation: any;
  previousPageNavigation: any;

  currentPage: any;
  lastPage: any;

  constructor(
    private fb: FormBuilder,
    private _documentService: DocumentService,
  ) { }

  ngOnInit(): void {
    this.getAllDocuments({ 'q': 'all' });
    this.setUpDocumentSearchForm();
  }

  setUpDocumentSearchForm(): void {
    this.documentSearchForm = this.fb.group({
      'searchQuery': ['', [Validators.required, Validators.minLength(4)]]
    });
  }


  getAllDocuments(query: IQueryparam) {
    this.isLoading = true;
    this.documents$ = this._documentService.getAllDocuments(query).pipe(
      tap(
        data => {
          this.isLoading = false;

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
    return this.documentSearchForm.get('searchQuery');
  }

}
