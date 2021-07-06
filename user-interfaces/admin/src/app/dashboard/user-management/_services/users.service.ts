import { HttpClient, HttpParams } from '@angular/common/http';

import { IUserData } from 'src/app/shared/interfaces/user/IUser';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers(queryParams?: any): Observable<IUserData> {
    const params = new HttpParams()
      .set('page', queryParams.page)
      .set('limit', queryParams.limit)
      .set('q', queryParams.q)
      .set('relation', queryParams.relation)
      .set('organization', queryParams.organizationID);

    return this.http.get<IUserData>(`${this.apiUrl}/users`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, user)
    .pipe(
      // catchError(this.handleError('addUser', any))
    );
  }

  updateUser(user: any, id: number | string): Observable<IUserData> {
    return this.http.patch<IUserData>(`${this.apiUrl}/users/${id}`, user)
    .pipe(
      // catchError(this.handleError('updateUser', any))
    );
  }

  getUserById(id: number | string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/users/${id}`).pipe(
      tap(data => data)
      // catchError(this.handleError)
    );
  }


  deleteUser(id: number | string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/users/${id}`)
      .pipe(
        // catchError(this.handleError('deleteUser'))
      );
  }
}
