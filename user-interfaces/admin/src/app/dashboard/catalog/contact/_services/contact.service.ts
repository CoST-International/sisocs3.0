import { HttpClient, HttpParams } from '@angular/common/http';
import { IContact, IContactAttributes, IContactData } from 'src/app/shared/interfaces/contact/IContact';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllContacts(queryParams?: any): Observable<IContactData> {
    let params = new HttpParams()
    .set('page', queryParams.page)
    .set('limit', queryParams.limit)

    return this.http.get<IContactData>(`${this.apiUrl}/contacts`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }

  addContact(contact: IContactAttributes): Observable<IContact> {
    return this.http.post<IContact>(`${this.apiUrl}/contacts`, contact)
    .pipe(
      // catchError(this.handleError('addContact', IContact))
    );
  }

  updateContact(contact: IContactAttributes, id: number | string): Observable<IContactAttributes> {
    return this.http.patch<IContactAttributes>(`${this.apiUrl}/contacts/${id}`, contact)
    .pipe(
      // catchError(this.handleError('updateContact', IContact))
    );
  }

  getContactById(id: number | string): Observable<IContact>{
    return this.http.get<IContact>(`${this.apiUrl}/contacts/${id}`)
      .pipe(
        tap(data => data)
        // catchError(this.handleError)
      );
  }


  deleteContact(id: number | string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/contacts/${id}`)
      .pipe(
        // catchError(this.handleError('deleteContact'))
      );
  }
}
