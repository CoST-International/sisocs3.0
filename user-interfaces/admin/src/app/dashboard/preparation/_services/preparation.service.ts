import { HttpClient, HttpParams } from '@angular/common/http';
import { IPreparation, IPreparationAttributes, IPreparationData } from 'src/app/shared/interfaces/preparation/IPreparation';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreparationService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllPreparations(queryParams?: any): Observable<IPreparationData> {
    let params = new HttpParams().set('page', queryParams.page).set('limit', queryParams.limit);
  return this.http.get<IPreparationData>(`${this.apiUrl}/preparations`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }

  addPreparation(preparation: IPreparationAttributes): Observable<IPreparation> {
    return this.http.post<IPreparation>(`${this.apiUrl}/preparations`, preparation)
    .pipe(
      // catchError(this.handleError('addPreparation', IPreparation))
    );
  }

  updatePreparation(preparation: IPreparationAttributes, id: number | string): Observable<IPreparationAttributes> {
    return this.http.patch<IPreparationAttributes>(`${this.apiUrl}/preparations/${id}`, preparation)
    .pipe(
      // catchError(this.handleError('updatePreparation', IPreparation))
    );
  }

  getPreparationById(id: number | string): Observable<IPreparation>{
    return this.http.get<IPreparation>(`${this.apiUrl}/preparations/${id}`)
      .pipe(
        tap(data => data)
        // catchError(this.handleError)
      );
  }


  deletePreparation(id: number | string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/preparations/${id}`)
      .pipe(
        // catchError(this.handleError('deletePreparation'))
      );
  }
}
