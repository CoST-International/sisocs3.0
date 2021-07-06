import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProjectFundingSource, IProjectFundingSourceAttributes } from 'src/app/shared/interfaces/project-funding-source/IProjectfundingsource';
import { IQueryparam } from 'src/app/shared/interfaces/queryparam/IQueryparam';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectFundingSourceService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllProjectFundingSources(queryParams: IQueryparam): Observable<IProjectFundingSource> {
    let params = new HttpParams().set('q', queryParams.q ? queryParams.q : '').set('project', queryParams.projectID ? queryParams.projectID : '');
    return this.http.get<IProjectFundingSource>(`${this.apiUrl}/project-funding-sources`, { params: params })
  }

  addProjectFundingSources(location: IProjectFundingSourceAttributes): Observable<IProjectFundingSourceAttributes> {
    return this.http.post<IProjectFundingSourceAttributes>(`${this.apiUrl}/project-funding-sources`, location)
      .pipe(
        // catchError(this.handleError('addLocation', ILocation))
      );
  }

  deleteProjectFundingSources(id: number | string) {
    return this.http.delete(`${this.apiUrl}/project-funding-sources/${id}`)
      .pipe(
        // catchError(this.handleError('addLocation', ILocation))
      );
  }

}
