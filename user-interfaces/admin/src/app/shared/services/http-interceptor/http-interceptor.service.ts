import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/_services/auth.service';
import { NotificationService } from '../notifications/notification.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router,
    public _auth: AuthService,
    public _notificationService: NotificationService,
    ) { }

    handleError(error: HttpErrorResponse){
      let errorMessage = '';

      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          errorMessage = error.error.message;
          localStorage.removeItem('token');
          this.router.navigate(['login']);
          this._notificationService.showErrorNotification('Error!', [errorMessage]);
        }
        if (error.status === 0) {
          errorMessage = 'Failed to connect to Server. Contact System Administrator';
          this._notificationService?.showErrorNotification('Error!', [errorMessage]);
        }
      }
      if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
        this._notificationService?.showErrorNotification('Error!', [errorMessage]);
      } else {
        if(error.status === 422) {
          this._notificationService?.showErrorNotification('Error!', error.error.errors.email[0]);
        } else {
          errorMessage = `${error.error.error.error}` ? `${error.error.error.error}` : 'Server error. Contact the System Administrator';
          this._notificationService.showErrorNotification('Error!', [errorMessage]);
        }

      }
      return throwError(error);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      const authToken = this._auth.getToken();
      if (authToken) {
        const authReq = req.clone({
            headers: req.headers
              .set('Authorization', `Bearer ${authToken}`)
              // .set('Accept', 'application/json')
              // .set('Content-Type', 'application/json')
        });

        return next.handle(authReq).pipe(
            tap((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
                // Response with HttpResponse type
              }
            },(error) => {
              this.handleError(error);
            }),
          );
        } else {
          const unauthReq = req.clone({
            headers: req.headers
              .set('Accept', 'application/json')
              .set('Content-Type', 'application/json')
          })
          return next.handle(unauthReq).pipe(
            // catchError(this.handleError)
          );
        }
    }
}
