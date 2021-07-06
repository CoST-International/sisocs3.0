import { HttpClient, HttpParams } from '@angular/common/http';
import { ILocation, ILocationAttributes } from '../../interfaces/location/ILocation';

import { IQueryparam } from '../../interfaces/queryparam/IQueryparam';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllLocations(queryParams: IQueryparam): Observable<ILocation> {
    let params = new HttpParams().set('q', queryParams.q ? queryParams.q : '').set('project', queryParams.projectID ? queryParams.projectID : '');
    return this.http.get<ILocation>(`${this.apiUrl}/locations`, { params: params })
  }

  addLocation(location: ILocationAttributes): Observable<ILocationAttributes> {
    return this.http.post<ILocationAttributes>(`${this.apiUrl}/locations`, location)
      .pipe(
        // catchError(this.handleError('addLocation', ILocation))
      );
  }

  deleteLocation(id: number | string) {
    return this.http.delete(`${this.apiUrl}/locations/${id}`)
      .pipe(
        // catchError(this.handleError('addLocation', ILocation))
      );
  }
}
