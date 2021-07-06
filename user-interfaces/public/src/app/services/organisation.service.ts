import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class OrganisationService {

  table = 'organisations';
  baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/organizations`);
  }

  getCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}/organizations-total-count`);
  }


}
