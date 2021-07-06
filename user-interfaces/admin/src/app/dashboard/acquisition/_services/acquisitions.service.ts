import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ITender, ITenderAttributes, ITenderData } from 'src/app/shared/interfaces/tender/ITender';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcquisitionsService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllTenders(queryParams?: any): Observable<ITenderData> {
    let params = new HttpParams().set('page', queryParams.page).set('limit', queryParams.limit);
  return this.http.get<ITenderData>(`${this.apiUrl}/tenders`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }

  addTender(tender: ITenderAttributes): Observable<ITender> {
    return this.http.post<ITender>(`${this.apiUrl}/tenders`, tender)
    .pipe(
      // catchError(this.handleError('addTender', ITender))
    );
  }

  updateTender(tender: ITenderAttributes, id: number | string): Observable<ITenderAttributes> {
    return this.http.patch<ITenderAttributes>(`${this.apiUrl}/tenders/${id}`, tender)
    .pipe(
      // catchError(this.handleError('updateTender', ITender))
    );
  }

  getTenderById(id: number | string): Observable<ITender>{
    return this.http.get<ITender>(`${this.apiUrl}/tenders/${id}`)
      .pipe(
        tap(data => data)
        // catchError(this.handleError)
      );
  }


  deleteTender(id: number | string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/tenders/${id}`)
      .pipe(
        // catchError(this.handleError('deleteTender'))
      );
  }
}
