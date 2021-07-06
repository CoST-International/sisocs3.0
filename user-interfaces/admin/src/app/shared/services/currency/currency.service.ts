import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICurrency } from '../../interfaces/currency/ICurrency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllCurrencies(queryParams?: any): Observable<ICurrency> {
    let params = new HttpParams().set('page', queryParams.page).set('limit', queryParams.limit);
    return this.http.get<ICurrency>(`${this.apiUrl}/currencies`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }
}
