import { HttpClient, HttpParams } from '@angular/common/http';
import { ISubsector, ISubsectorAttributes } from 'src/app/shared/interfaces/subsector/ISubsector';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubsectorsService {
  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllSubsectors(queryParams?: any): Observable<ISubsector> {
    let params = new HttpParams().set('q', queryParams.q);
    return this.http.get<ISubsector>(`${this.apiUrl}/sub-sectors`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }

  updateSubsector(subsector: ISubsectorAttributes, id: number | string): Observable<ISubsectorAttributes> {
    return this.http.patch<ISubsectorAttributes>(`${this.apiUrl}/sub-sectors/${id}`, subsector)
    .pipe(
      // catchError(this.handleError('updateSubsector', ISubsector))
    );
  }

  getSubsectorById(id: number | string): Observable<ISubsectorAttributes>{
    return this.http.get<ISubsectorAttributes>(`${this.apiUrl}/sub-sectors/${id}`).pipe(
      tap(data => data)
      // catchError(this.handleError)
    );
  }


  deleteSubsector(id: number | string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/sub-sectors/${id}`)
      .pipe(
        // catchError(this.handleError('deleteSubsector'))
      );
  }
}
