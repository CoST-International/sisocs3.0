import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GuaranteesService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllGuarantees(url='', val: string='') {
    const params = new HttpParams()
      .set('q', val);

    return this.http.get< any | null>(url ? url : `${this.apiUrl}/guarantees`, {params}).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }

  addGuarantee(guarantee: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/guarantees`, guarantee)
    .pipe(
      // catchError(this.handleError('addguarantee', Iguarantee))
    );
  }

  updateGuarantee(guarantee: any, id: number | string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/guarantees/${id}`, guarantee)
    .pipe(
      // catchError(this.handleError('updateguarantee', Iguarantee))
    );
  }

  getGuaranteeById(id: number | string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/guarantees/${id}`).pipe(
      tap(data => data)
      // catchError(this.handleError)
    );
  }


  deleteGuarantee(id: number | string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/guarantees/${id}`)
      .pipe(
        // catchError(this.handleError('deleteguarantee'))
      );
  }
}
