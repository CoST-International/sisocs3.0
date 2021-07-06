import { HttpClient, HttpParams } from '@angular/common/http';
import { IPurpose, IPurposeAttributes } from 'src/app/shared/interfaces/Purpose/IPurpose';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PurposesService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllPurposes(queryParams?: any): Observable<IPurpose> {
    let params = new HttpParams().set('q', queryParams.q);
    return this.http.get<IPurpose>(`${this.apiUrl}/purposes`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }

  updatePurpose(purpose: IPurposeAttributes, id: number | string): Observable<IPurposeAttributes> {
    return this.http.patch<IPurposeAttributes>(`${this.apiUrl}/purposes/${id}`, purpose)
    .pipe(
      // catchError(this.handleError('updatePurpose', IPurpose))
    );
  }

  getPurposeById(id: number | string): Observable<IPurposeAttributes>{
    return this.http.get<IPurposeAttributes>(`${this.apiUrl}/purposes/${id}`).pipe(
      tap(data => data)
      // catchError(this.handleError)
    );
  }


  deletePurpose(id: number | string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/purposes/${id}`)
      .pipe(
        // catchError(this.handleError('deletePurpose'))
      );
  }
}
