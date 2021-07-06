import { HttpClient, HttpParams } from '@angular/common/http';
import { IPrequalification, IPrequalificationAttributes, IPrequalificationData } from 'src/app/shared/interfaces/prequalification/IPrequalification';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrequalificationService {
  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllPrequalifications(queryParams?: any): Observable<IPrequalificationData> {
    let params = new HttpParams()
    .set('page', queryParams.page)
    .set('limit', queryParams.limit)
    .set('q', queryParams.q);

    return this.http.get<IPrequalificationData>(`${this.apiUrl}/prequalifications`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }

  addPrequalification(prequalification: IPrequalificationAttributes): Observable<IPrequalification> {
    return this.http.post<IPrequalification>(`${this.apiUrl}/prequalifications`, prequalification)
    .pipe(
      // catchError(this.handleError('addPrequalification', IPrequalification))
    );
  }

  updatePrequalification(prequalification: IPrequalificationAttributes, id: number | string): Observable<IPrequalificationAttributes> {
    return this.http.patch<IPrequalificationAttributes>(`${this.apiUrl}/prequalifications/${id}`, prequalification)
    .pipe(
      // catchError(this.handleError('updatePrequalification', IPrequalification))
    );
  }

  getPrequalificationById(id: number | string): Observable<IPrequalification>{
    return this.http.get<IPrequalification>(`${this.apiUrl}/prequalifications/${id}`)
      .pipe(
        tap(data => data)
        // catchError(this.handleError)
      );
  }


  deletePrequalification(id: number | string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/prequalifications/${id}`)
      .pipe(
        // catchError(this.handleError('deletePrequalification'))
      );
  }
}
