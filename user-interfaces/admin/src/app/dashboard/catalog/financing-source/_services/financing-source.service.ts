import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IFundingsource } from 'src/app/shared/interfaces/funding-source/IFundingsource';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinancingSourceService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllFundingSources(queryParams?: any): Observable<IFundingsource> {
    let params = new HttpParams().set('page', queryParams.page).set('limit', queryParams.limit);
    return this.http.get<IFundingsource>(`${this.apiUrl}/funding-sources`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }
}
