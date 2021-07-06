import { HttpClient, HttpParams } from '@angular/common/http';
import { IOfficial, IOfficialAttributes, IOfficialData } from 'src/app/shared/interfaces/official/IOfficial';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfficialsService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllOfficials(queryParams?: any): Observable<IOfficialData> {
    let params = new HttpParams()
    .set('page', queryParams.page)
    .set('limit', queryParams.limit)
    .set('q', queryParams.q)
    .set('relation', queryParams.relation)
    .set('organization', queryParams.organizationID);

    return this.http.get<IOfficialData>(`${this.apiUrl}/officials`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }

  addOfficial(official: IOfficialAttributes): Observable<IOfficial> {
    return this.http.post<IOfficial>(`${this.apiUrl}/officials`, official)
    .pipe(
      // catchError(this.handleError('addProject', IProject))
    );
  }

  updateOfficial(official: IOfficialAttributes, id: number | string): Observable<IOfficialAttributes> {
    return this.http.patch<IOfficialAttributes>(`${this.apiUrl}/officials/${id}`, official)
    .pipe(
      // catchError(this.handleError('updateOfficial', IOfficial))
    );
  }

  getOfficialById(id: number | string): Observable<IOfficial>{
    return this.http.get<IOfficial>(`${this.apiUrl}/officials/${id}`).pipe(
      tap(data => data)
      // catchError(this.handleError)
    );
  }


  deleteOfficial(id: number | string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/officials/${id}`)
      .pipe(
        // catchError(this.handleError('deleteOfficial'))
      );
  }
}
