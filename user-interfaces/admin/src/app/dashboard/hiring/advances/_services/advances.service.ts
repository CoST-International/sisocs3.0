import { HttpClient, HttpParams } from '@angular/common/http';
import { IAdvance, IAdvanceAttributes, IAdvanceData } from 'src/app/shared/interfaces/advance/IAdvance';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdvancesService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllAdvances(queryParams?: any): Observable<IAdvanceData> {
    let params = new HttpParams()
    .set('page', queryParams.page)
    .set('limit', queryParams.limit)
    .set('q', queryParams.q)
    .set('relation', queryParams.relation)
    .set('organization', queryParams.organizationID);

    return this.http.get<IAdvanceData>(`${this.apiUrl}/advances`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }

  addAdvance(advance: IAdvanceAttributes): Observable<IAdvance> {
    return this.http.post<IAdvance>(`${this.apiUrl}/advances`, advance)
    .pipe(
      // catchError(this.handleError('addAdvance', IAdvance))
    );
  }

  updateAdvance(advance: IAdvanceAttributes, id: number | string): Observable<IAdvanceAttributes> {
    return this.http.patch<IAdvanceAttributes>(`${this.apiUrl}/advances/${id}`, advance)
    .pipe(
      // catchError(this.handleError('updateAdvance', IAdvance))
    );
  }

  getAdvanceById(id: number | string): Observable<IAdvance>{
    return this.http.get<IAdvance>(`${this.apiUrl}/advances/${id}`)
      .pipe(
        tap(data => data)
        // catchError(this.handleError)
      );
  }


  deleteAdvance(id: number | string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/advances/${id}`)
      .pipe(
        // catchError(this.handleError('deleteAdvance'))
      );
  }
}
