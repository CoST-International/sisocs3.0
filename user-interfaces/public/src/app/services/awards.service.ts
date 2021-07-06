import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AwardsService {

  table = 'awards';
  baseUrl = environment.apiBaseUrl;

  constructor( private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/awards`);
  }


  getAwardCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}/awards-total-count`);
  }



}
