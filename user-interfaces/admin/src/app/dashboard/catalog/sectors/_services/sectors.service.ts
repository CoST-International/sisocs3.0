import { HttpClient, HttpParams } from '@angular/common/http';
import { ISector, ISectorAttributes } from 'src/app/shared/interfaces/sector/ISector';

import { IOc4idsSector } from '../../../../shared/interfaces/oc4ids-sector/IOc4idssector';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SectorsService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllSectors(queryParams?: any): Observable<IOc4idsSector> {
    let params = new HttpParams().set('q', queryParams.q);
    return this.http.get<IOc4idsSector>(`${this.apiUrl}/oc4ids-sectors`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }

  updateSector(sector: ISectorAttributes, id: number | string): Observable<ISectorAttributes> {
    return this.http.patch<ISectorAttributes>(`${this.apiUrl}/sectors/${id}`, sector)
    .pipe(
      // catchError(this.handleError('updateSector', ISector))
    );
  }

  getSectorById(id: number | string): Observable<ISectorAttributes>{
    return this.http.get<ISectorAttributes>(`${this.apiUrl}/sectors/${id}`).pipe(
      tap(data => data)
      // catchError(this.handleError)
    );
  }


  deleteSector(id: number | string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/sectors/${id}`)
      .pipe(
        // catchError(this.handleError('deleteSector'))
      );
  }
}
