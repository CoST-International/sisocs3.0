import { HandleError, HttpHandleErrorService } from 'src/app/shared/services/http-handle-error/http-handle-error.service';
import { IUser, IUserAttributes, IUserData } from 'src/app/shared/interfaces/user/IUser';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: IUserAttributes = {};
  private handleError: HandleError;

  private apiUrl = environment.apiUrl;
  private authUrl = environment.authUrl;

  private passwordResetLinkUrl = `${this.authUrl}/reset-password-link`;
  private passwordReset = `${this.authUrl}/reset-password`;

  constructor(
      private router: Router,
      private http: HttpClient,
      private _httpHandleErrorService: HttpHandleErrorService,
  ) {
      this.handleError = _httpHandleErrorService.createHandleError('AuthService');
  }

  login(userCredentials: IUserAttributes): Observable<any[] | IUser> {
      return this.http.post(`${this.authUrl}/auth/login`, userCredentials)
          .pipe(
              map((response: any) => {
                  const token: string = response['token'];
                  const user: IUserAttributes = response['user'];
                  if (token && token !== null && token !== undefined) {
                    this.setToken(token);
                  }
                  if (user && user !== null && user !== undefined) {
                    this.setUser(user);
                  }
                  return response;
              }),
              // catchError(this.handleError('login', []))
          );
  }

  logout(user: IUserAttributes) {
      return this.http.post(`${this.authUrl}/auth/logout`, '').pipe(
              tap(
                  () => {
                      localStorage.clear();
                      this.router.navigate(['/']);
                  }
              )
          );
  }

  setToken(token: string): void {
      return localStorage.setItem('token', token);
  }

  setUser(user: IUserAttributes): void {
    return localStorage.setItem('user', JSON.stringify(user));
  }

  getToken(): string {
      return localStorage.getItem('token') || '';
  }
  getUser(): string {
    return localStorage.getItem('user') || '';
  }

  getUserOrganization() {
    return JSON.parse(this.getUser());
  }

  isAdmin(): boolean {
    const user: IUserAttributes = JSON.parse(this.getUser());
    if (user.role?.name == 'Administrador SISOCS' || user.role?.id === 5) {
      return true;
    }
    return false;
  }

  isPEAdmin(): boolean {
    const user: IUserAttributes = JSON.parse(this.getUser());
    if (user.role?.name == 'PE Administrator' || user.role?.id === 24) {
      return true;
    }
    return false;
  }

  isPublisher(): boolean {
    const user: IUserAttributes = JSON.parse(this.getUser());
    if (user.role?.name == 'Publisher Quality Control Officers (QCO)' || user.role?.id === 25) {
      return true;
    }
    return false;
  }

  isQCO(): boolean {
    const user: IUserAttributes = JSON.parse(this.getUser());
    if (user.role?.name == 'Quality Control Officers (QCO)' || user.role?.id === 26) {
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
      const token: string = this.getToken();
      if (token) {
          return true;
      }
      return false;
  }

  resetPassword(email: string) {
      return this.http.post(`${this.passwordReset}`, email)
          .pipe(
              catchError(this.handleError('resetPassword', []))
          );
  }

  registerUser(user: IUserAttributes) {
    return this.http.post(`${this.authUrl}/auth/register`, user)
      .pipe(
        tap((user) => user),
        catchError(this.handleError('registerUser', []))
      );
  }

  getCurrentUser(): Observable<IUser> {
    return this.http.post<IUser>(`${this.authUrl}/auth/me`, {})
      .pipe(
        tap((user) => user)
      );
  }

}
