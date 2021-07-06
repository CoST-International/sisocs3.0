import { HttpClient, HttpParams } from '@angular/common/http';
import { IState, IStateAttributes } from 'src/app/shared/interfaces/state/IState';

import { IQueryparam } from 'src/app/shared/interfaces/queryparam/IQueryparam';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllStates(queryParams: IQueryparam): Observable<IState> {
    let params = new HttpParams().set('q', queryParams.q ? queryParams.q : '').set('state', queryParams.state ? queryParams.state : '');
    return this.http.get<IState>(`${this.apiUrl}/states`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }

  updateState(state: IStateAttributes, id: number | string): Observable<IStateAttributes> {
    return this.http.patch<IStateAttributes>(`${this.apiUrl}/states/${id}`, state)
    .pipe(
      // catchError(this.handleError('updateState', IState))
    );
  }

  getStateById(id: number | string): Observable<IStateAttributes>{
    return this.http.get<IStateAttributes>(`${this.apiUrl}/states/${id}`).pipe(
      tap(data => data)
      // catchError(this.handleError)
    );
  }


  deleteState(id: number | string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/states/${id}`)
      .pipe(
        // catchError(this.handleError('deleteState'))
      );
  }
}
