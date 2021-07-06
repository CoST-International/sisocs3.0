import { HttpClient, HttpParams } from '@angular/common/http';
import { IProject, IProjectAttributes, IProjectData } from 'src/app/shared/interfaces/project/IProject';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllProjects(queryParams?: any): Observable<IProjectData> {
    let params = new HttpParams()
    .set('page', queryParams.page)
    .set('limit', queryParams.limit)
    .set('q', queryParams.q)
    .set('relation', queryParams.relation)
    .set('organization', queryParams.organizationID);

    return this.http.get<IProjectData>(`${this.apiUrl}/projects`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }

  addProject(project: IProjectAttributes): Observable<IProject> {
    return this.http.post<IProject>(`${this.apiUrl}/projects`, project)
    .pipe(
      // catchError(this.handleError('addProject', IProject))
    );
  }

  updateProject(project: IProjectAttributes, id: number | string): Observable<IProjectAttributes> {
    return this.http.patch<IProjectAttributes>(`${this.apiUrl}/projects/${id}`, project)
    .pipe(
      // catchError(this.handleError('updateProject', IProject))
    );
  }

  getProjectById(id: number | string): Observable<IProject>{
    return this.http.get<IProject>(`${this.apiUrl}/projects/${id}`)
      .pipe(
        tap(data => data)
        // catchError(this.handleError)
      );
  }


  deleteProject(id: number | string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/projects/${id}`)
      .pipe(
        // catchError(this.handleError('deleteProject'))
      );
  }
}
