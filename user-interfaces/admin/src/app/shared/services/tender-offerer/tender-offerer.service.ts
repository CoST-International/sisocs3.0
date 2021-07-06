import { HttpClient, HttpParams } from '@angular/common/http';
import { ITenderOfferer, ITenderOffererAttributes, ITenderOffererData } from '../../interfaces/tender-offerer/TenderOfferer';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TenderOffererService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllTenderOfferers(queryParams?: any): Observable<ITenderOffererData> {
    let params = new HttpParams()
    .set('page', queryParams.page)
    .set('limit', queryParams.limit)
    .set('q', queryParams.q)
    .set('relation', queryParams.relation)
    .set('tender', queryParams.tenderID);

    return this.http.get<ITenderOffererData>(`${this.apiUrl}/tender-offerers`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }

  addTenderOfferer(tenderOfferer: ITenderOffererAttributes): Observable<ITenderOfferer> {
    return this.http.post<ITenderOfferer>(`${this.apiUrl}/tender-offerers`, tenderOfferer)
    .pipe(
      // catchError(this.handleError('addProject', IProject))
    );
  }

  updateTenderOfferer(tenderOfferer: ITenderOffererAttributes, id: number | string): Observable<ITenderOffererAttributes> {
    return this.http.patch<ITenderOffererAttributes>(`${this.apiUrl}/tender-offerers/${id}`, tenderOfferer)
    .pipe(
      // catchError(this.handleError('updateProject', IProject))
    );
  }

  getTenderOffererById(id: number | string): Observable<ITenderOfferer>{
    return this.http.get<ITenderOfferer>(`${this.apiUrl}/tender-offerers/${id}`)
      .pipe(
        tap(data => data)
        // catchError(this.handleError)
      );
  }

  deleteTenderOfferer(id: number | string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/tender-offerers/${id}`)
      .pipe(
        // catchError(this.handleError('deleteProject'))
      );
  }
}
