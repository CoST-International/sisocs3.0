import { HttpClient, HttpParams } from '@angular/common/http';
import { IExecution, IExecutionData } from 'src/app/shared/interfaces/execution/IExecution';

import { IExecutionAttributes } from '../../../../shared/interfaces/execution/IExecution';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExecutionService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllExecutions(queryParams?: any): Observable<IExecutionData> {
    let params = new HttpParams()
    .set('page', queryParams.page)
    .set('limit', queryParams.limit)
    .set('q', queryParams.q)
    .set('relation', queryParams.relation)

    return this.http.get<IExecutionData>(`${this.apiUrl}/executions`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }

  addExecution(addendum: IExecutionAttributes): Observable<IExecution> {
    return this.http.post<IExecution>(`${this.apiUrl}/executions`, addendum)
    .pipe(
      // catchError(this.handleError('addExecution', IExecution))
    );
  }

  updateExecution(addendum: IExecutionAttributes, id: number | string): Observable<IExecutionAttributes> {
    return this.http.patch<IExecutionAttributes>(`${this.apiUrl}/executions/${id}`, addendum)
    .pipe(
      // catchError(this.handleError('updateExecution', IExecution))
    );
  }

  getExecutionById(id: number | string): Observable<IExecution>{
    return this.http.get<IExecution>(`${this.apiUrl}/executions/${id}`)
      .pipe(
        tap(data => data)
        // catchError(this.handleError)
      );
  }


  deleteExecution(id: number | string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/executions/${id}`)
      .pipe(
        // catchError(this.handleError('deleteExecution'))
      );
  }
}
