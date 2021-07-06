import { HttpClient, HttpParams } from '@angular/common/http';

import { IOffererData } from '../../interfaces/offerer/offerer';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfferersService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllOfferers(queryParams?: any): Observable<IOffererData> {
    let params = new HttpParams()
    .set('page', queryParams.page)
    .set('limit', queryParams.limit)
    .set('q', queryParams.q);

    return this.http.get<IOffererData>(`${this.apiUrl}/offerers`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }
}
