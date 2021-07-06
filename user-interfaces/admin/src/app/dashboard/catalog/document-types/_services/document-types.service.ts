import { HttpClient, HttpParams } from '@angular/common/http';

import { IDocumentType } from 'src/app/shared/interfaces/document-types/IDocumentType';
import { IQueryparam } from 'src/app/shared/interfaces/queryparam/IQueryparam';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypesService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllDocumentTypes(queryParams: IQueryparam): Observable<IDocumentType> {
    let params = new HttpParams().set('q', queryParams.q ? queryParams.q : '').set('section', queryParams.section ? queryParams.section : '');
    return this.http.get<IDocumentType>(`${this.apiUrl}/document-types`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }

}
