import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthService } from 'src/app/auth/_services/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(
    private router: Router,
    private _authService: AuthService) {

  }
  canActivate(): boolean {
    if (this._authService.isAuthenticated()) {
        this.router.navigate(['/dashboard'])
        return false
    } else {
        return true
    }
}

}
