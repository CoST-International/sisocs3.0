import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { IAward, IAwardAttributes, IAwardData } from 'src/app/shared/interfaces/award/IAward';

@Injectable({
  providedIn: 'root'
})
export class AwardService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllAwards(queryParams?: any): Observable<IAwardData> {
    
    let params = new HttpParams()
    .set('page', queryParams.page)
    .set('limit', queryParams.limit)
    .set('q', queryParams.q)
    .set('relation', queryParams.relation)
    .set('organization', queryParams.organizationID);

    return this.http.get<IAwardData>(`${this.apiUrl}/awards`, { params: params }).pipe(
        tap(data => data),
        // catchError(this.handleError)
    );
  }

  addAward(award: IAwardAttributes): Observable<IAward> {
    return this.http.post<IAward>(`${this.apiUrl}/awards`, award)
    .pipe(
      // catchError(this.handleError('addAward', IAward))
    );
  }

  updateAward(award: IAwardAttributes, id: number | string): Observable<IAwardAttributes> {
    return this.http.patch<IAwardAttributes>(`${this.apiUrl}/awards/${id}`, award)
    .pipe(
      // catchError(this.handleError('updateAward', IAward))
    );
  }

  getAwardById(id: number | string): Observable<IAward>{
    return this.http.get<IAward>(`${this.apiUrl}/awards/${id}`)
      .pipe(
        tap(data => data)
        // catchError(this.handleError)
      );
  }


  deleteAward(id: number | string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/awards/${id}`)
      .pipe(
        // catchError(this.handleError('deleteAward'))
      );
  }
}
