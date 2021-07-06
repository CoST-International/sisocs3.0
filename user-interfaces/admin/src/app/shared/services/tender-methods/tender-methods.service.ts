import { HttpClient, HttpParams } from '@angular/common/http';
import { ITenderMethod, ITenderMethodData } from '../../interfaces/tender-methods/ITenderMethod';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TenderMethodsService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllTendermethods(queryParams?: any): Observable<ITenderMethodData> {
    let params = new HttpParams().set('page', queryParams.page).set('limit', queryParams.limit);
    return this.http.get<ITenderMethodData>(`${this.apiUrl}/tender-methods`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }
}
