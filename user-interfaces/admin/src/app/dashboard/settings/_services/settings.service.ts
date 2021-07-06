import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getAllSettings(url='', val: string='') {
    const params = new HttpParams()
      .set('q', val);

    return this.http.get<any | null>(url ? url : `${this.apiUrl}/settings`, {params}).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }

  addSetting(setting: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/settings`, setting)
    .pipe(
      // catchError(this.handleError('addSetting', any))
    );
  }

  updateSetting(setting: any, id: number | string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/settings/${id}`, setting)
    .pipe(
      // catchError(this.handleError('updateSetting', any))
    );
  }

  getSettingById(id: number | string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/settings/${id}`).pipe(
      tap(data => data)
      // catchError(this.handleError)
    );
  }


  deleteSetting(id: number | string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/settings/${id}`)
      .pipe(
        // catchError(this.handleError('deleteSetting'))
      );
  }
}
