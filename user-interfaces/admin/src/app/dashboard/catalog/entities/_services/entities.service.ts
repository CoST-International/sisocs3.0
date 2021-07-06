import { HttpClient, HttpParams } from '@angular/common/http';
import { IOrganization, IOrganizationAttributes, IOrganizationData } from '../../../../shared/interfaces/organization/IOrganization';
import { IOrganizationunit, IOrganizationunitData } from 'src/app/shared/interfaces/organization-unit/IOrganizationunit';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllEntities(queryParams?: any): Observable<IOrganizationData> {
    let params = new HttpParams().set('page', queryParams.page).set('limit', queryParams.limit);
    return this.http.get<IOrganizationData>(`${this.apiUrl}/organizations`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }

  getAllEntitiesUnits(queryParams?: any): Observable<IOrganizationunitData> {
    let params = new HttpParams().set('page', queryParams.page).set('limit', queryParams.limit);
    return this.http.get<IOrganizationunitData>(`${this.apiUrl}/organization-units`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }

  addEntity(project: IOrganizationAttributes): Observable<IOrganization> {
    return this.http.post<IOrganization>(`${this.apiUrl}/organizations`, project)
    .pipe(
      // catchError(this.handleError('addProject', IProject))
    );
  }

  updateEntity(entity: IOrganizationAttributes, id: number | string): Observable<IOrganizationAttributes> {
    return this.http.patch<IOrganizationAttributes>(`${this.apiUrl}/organizations/${id}`, entity)
    .pipe(
      // catchError(this.handleError('updateEntity', IEntity))
    );
  }

  getEntityById(id: number | string): Observable<IOrganization>{
    return this.http.get<IOrganization>(`${this.apiUrl}/organizations/${id}`).pipe(
      tap(data => data)
      // catchError(this.handleError)
    );
  }


  deleteEntity(id: number | string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/organizations/${id}`)
      .pipe(
        // catchError(this.handleError('deleteEntity'))
      );
  }
}
