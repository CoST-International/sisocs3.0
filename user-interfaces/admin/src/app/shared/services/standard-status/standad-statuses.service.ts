import { HttpClient, HttpParams } from '@angular/common/http';
import { IStandardstatus, IStandardstatusAttributes } from '../../interfaces/standardstatus/IStandardstatus';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StandadStatusesService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllStandardstatuses(queryParams?: any): Observable<IStandardstatus> {
    let params = new HttpParams().set('section', queryParams.section);
    return this.http.get<IStandardstatus>(`${this.apiUrl}/standard-statuses`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }

  updateStandardstatus(official: IStandardstatusAttributes, id: number | string): Observable<IStandardstatusAttributes> {
    return this.http.patch<IStandardstatusAttributes>(`${this.apiUrl}/standard-statuses/${id}`, official)
    .pipe(
      // catchError(this.handleError('updateStandardstatus', IStandardstatus))
    );
  }

  getStandardstatusById(id: number | string): Observable<IStandardstatusAttributes>{
    return this.http.get<IStandardstatusAttributes>(`${this.apiUrl}/standard-statuses/${id}`).pipe(
      tap(data => data)
      // catchError(this.handleError)
    );
  }


  deleteStandardstatus(id: number | string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/standard-statuses/${id}`)
      .pipe(
        // catchError(this.handleError('deleteStandardstatus'))
      );
  }
}
