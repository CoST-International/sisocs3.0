import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AuthService } from 'src/app/auth/_services/auth.service';
import { DashboardAnalyticsService } from './_services/dashboard-analytics.service';
import { IAnalytics } from '../../shared/interfaces/analytics/analytics';
import { IQueryparam } from 'src/app/shared/interfaces/queryparam/IQueryparam';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  isLoading: Boolean = false;
  isRequestLoading: Boolean = false;

  analytics!: IAnalytics;
  errorMessage: string = '';

  queryParam!: number | number;

  constructor(
    private router: Router,
    private _dashboardAnalyticsService: DashboardAnalyticsService,
    private _authService: AuthService
  ) {
    this.queryParam = !this._authService.isAdmin ? this._authService.getUserOrganization()['organization']['id'] : '';
    this.getAnalytics(this.queryParam ? this.queryParam : '');
  }

  routeTo(link: string): void {
    this.router.navigate([link]);
  }

  getAnalytics(params: number | string) {
    this.isRequestLoading = true;
    this._dashboardAnalyticsService.getAnalytics(params).subscribe(
      (analytics) => {
        this.isRequestLoading = false;
        this.analytics = analytics;
      },
      (error) => {
        this.isRequestLoading = false;
      }
    );
  }

}
