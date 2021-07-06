import { HttpClient, HttpParams } from '@angular/common/http';
import { IOrganizationunit, IOrganizationunitAttributes, IOrganizationunitData } from 'src/app/shared/interfaces/organization-unit/IOrganizationunit';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrganizationUnitService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllEntityUnits(queryParams?: any): Observable<IOrganizationunitData> {
    let params = new HttpParams()
    .set('page', queryParams.page)
    .set('limit', queryParams.limit)
    .set('q', queryParams.q);
    return this.http.get<IOrganizationunitData>(`${this.apiUrl}/organization-units`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }

  getAllEntitiesUnits(queryParams?: any): Observable<IOrganizationunit> {
    let params = new HttpParams().set('page', queryParams.page).set('limit', queryParams.limit);
    return this.http.get<IOrganizationunit>(`${this.apiUrl}/organization-units`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }

  addEntityUnit(project: IOrganizationunitAttributes): Observable<IOrganizationunit> {
    return this.http.post<IOrganizationunit>(`${this.apiUrl}/organization-units`, project)
    .pipe(
      // catchError(this.handleError('addProject', IProject))
    );
  }

  updateEntityUnit(entity: IOrganizationunitAttributes, id: number | string): Observable<IOrganizationunitAttributes> {
    return this.http.patch<IOrganizationunitAttributes>(`${this.apiUrl}/organization-units/${id}`, entity)
    .pipe(
      // catchError(this.handleError('updateEntityUnit', IEntityUnit))
    );
  }

  getEntityUnitById(id: number | string): Observable<IOrganizationunit>{
    return this.http.get<IOrganizationunit>(`${this.apiUrl}/organization-units/${id}`).pipe(
      tap(data => data)
      // catchError(this.handleError)
    );
  }


  deleteEntityUnit(id: number | string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/organization-units/${id}`)
      .pipe(
        // catchError(this.handleError('deleteEntityUnit'))
      );
  }
}
