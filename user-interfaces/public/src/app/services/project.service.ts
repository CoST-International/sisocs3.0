import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  table = 'oc4idsProjects';
  baseUrl = environment.apiBaseUrl;

  constructor( private http: HttpClient) { }

  getFoo() {
    console.log('foo');
  }


  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects`);
  }




  getProjectCount(): Observable<any>  {
    return this.http.get(`${this.baseUrl}/projects-total-count`);
  }

  getProject(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects?id=` + id);
  }

  getProjectsSum(): Observable<any>   {
    return this.http.get(`${this.baseUrl}/projects-total-sum`);
  }

  searchDocuments(p): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects?p=` + p);
  }

  getBySector(s): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects?s=` + s);
  }

  getProjectYears(): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects-get-years`);
  }






  getByYear(o, y): Observable<any> {
    return this.http.get(`${this.baseUrl}/project-by-year?o=` + o + '&y=' + y);
  }



}






