import { HttpClient, HttpParams } from '@angular/common/http';
import { IRole, IRoleData } from '../../../../../shared/interfaces/role/IRole';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllRoles(queryParams?: any): Observable<IRoleData> {
    let params = new HttpParams().set('page', queryParams.page).set('limit', queryParams.limit);
    return this.http.get<IRoleData>(`${this.apiUrl}/roles`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }
}
