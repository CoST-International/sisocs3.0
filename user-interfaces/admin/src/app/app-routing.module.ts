import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from './shared/guards/authentication/authentication.guard';
import { LoggedInGuard } from './shared/guards/logged-in.guard';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { NotFoundComponentComponent } from './shared/not-found-component/not-found-component.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent, canActivate: [LoggedInGuard]
  },
  {
    path: '404', component: NotFoundComponentComponent
  },
  {
    path: '**', redirectTo: '/404'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
