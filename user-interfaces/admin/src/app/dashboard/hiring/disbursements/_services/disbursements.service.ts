import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DisbursementsService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllDisbursements(url='', val: string='') {
    const params = new HttpParams()
      .set('q', val);

    return this.http.get<any | null>(url ? url : `${this.apiUrl}/disbursements`, {params}).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }

  addDisbursement(disbursement: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/disbursements`, disbursement)
    .pipe(
      // catchError(this.handleError('addDisbursement', any))
    );
  }

  updateDisbursement(disbursement: any, id: number | string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/disbursements/${id}`, disbursement)
    .pipe(
      // catchError(this.handleError('updateDisbursement', any))
    );
  }

  getDisbursementById(id: number | string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/disbursements/${id}`).pipe(
      tap(data => data)
      // catchError(this.handleError)
    );
  }


  deleteDisbursement(id: number | string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/disbursements/${id}`)
      .pipe(
        // catchError(this.handleError('deleteDisbursement'))
      );
  }
}
