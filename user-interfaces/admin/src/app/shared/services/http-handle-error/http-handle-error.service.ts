import { Observable, of } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationService } from '../notifications/notification.service';

export type HandleError = <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

@Injectable({
  providedIn: 'root',
})
export class HttpHandleErrorService {

  message: string = '';

  constructor(
    private _notificationService: NotificationService
  ) { }

  /** Pass the service name to map errors */
  createHandleError = (serviceName = '') => <T>
    (operation = 'operation', result = {} as T) =>
    this.handleError(serviceName, operation, result)
  handleError<T>(serviceName = '', operation =
    'operation', result = {} as T) {
    return (response: HttpErrorResponse):
      Observable<T> => {
      // Optionally send the error to a third part error logging service
      // console.error(response);
      if (response.error instanceof ErrorEvent) {
        this.message = response.error.message;
        this._notificationService.showErrorNotification('Error!', [this.message]);
      } else {
        this.message = `${response.error.error.error}` ?
          `${response.error.error.error}` : 'Internal Server error. Contact the System Administrator';
        this._notificationService.showErrorNotification('Error!', [this.message]);
      }
      // Keep running and returning a safe result.
      return of(result);
    };
  }
}
