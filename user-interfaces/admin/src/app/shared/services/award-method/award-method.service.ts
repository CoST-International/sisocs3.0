import { HttpClient, HttpParams } from '@angular/common/http';
import { IAwardMethod, IAwardMethodAttributes } from '../../interfaces/award-methods/IAwardMethods';

import { IAwardMethodData } from 'src/app/shared/interfaces/award-methods/IAwardMethods';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AwardMethodService {
  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllAwardMethods(queryParams?: any): Observable<IAwardMethodData> {
    let params = new HttpParams().set('page', queryParams.page).set('limit', queryParams.limit);
    return this.http.get<IAwardMethodData>(`${this.apiUrl}/award-methods`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }
}
