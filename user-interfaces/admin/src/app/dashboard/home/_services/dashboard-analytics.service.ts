import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { IQueryparam } from 'src/app/shared/interfaces/queryparam/IQueryparam';
import { Injectable } from '@angular/core';
import { NotificationService } from '../../../shared/services/notifications/notification.service';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardAnalyticsService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient,
  ) { }

  getAnalytics(queryParam: number | string) {
    let params = new HttpParams()
      .set('organization', queryParam)
    return this.http.get<any | null>(`${this.apiUrl}/dashboard-analytics`).pipe(
      tap(data => data)
    );
  }
}
