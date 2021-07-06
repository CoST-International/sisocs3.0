import { HttpClient, HttpParams } from '@angular/common/http';
import { IAddendum, IAddendumAttributes, IAddendumData } from '../../../../shared/interfaces/addendum/IAddendum';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddendaService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllAddenda(queryParams?: any): Observable<IAddendumData> {
    let params = new HttpParams()
    .set('page', queryParams.page)
    .set('limit', queryParams.limit)
    .set('q', queryParams.q)
    .set('relation', queryParams.relation)

    return this.http.get<IAddendumData>(`${this.apiUrl}/addenda`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }

  addAddendum(addendum: IAddendumAttributes): Observable<IAddendum> {
    return this.http.post<IAddendum>(`${this.apiUrl}/addenda`, addendum)
    .pipe(
      // catchError(this.handleError('addAddendum', IAddendum))
    );
  }

  updateAddendum(addendum: IAddendumAttributes, id: number | string): Observable<IAddendumAttributes> {
    return this.http.patch<IAddendumAttributes>(`${this.apiUrl}/addenda/${id}`, addendum)
    .pipe(
      // catchError(this.handleError('updateAddendum', IAddendum))
    );
  }

  getAddendumById(id: number | string): Observable<IAddendum>{
    return this.http.get<IAddendum>(`${this.apiUrl}/addenda/${id}`)
      .pipe(
        tap(data => data)
        // catchError(this.handleError)
      );
  }


  deleteAddendum(id: number | string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/addenda/${id}`)
      .pipe(
        // catchError(this.handleError('deleteAddendum'))
      );
  }
}
