import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEnvironmentalcategory } from 'src/app/shared/interfaces/environmental-category/IEnvironmentalcategory';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentalCategoryService {


  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllEnvironmentalCategories(queryParams?: any): Observable<IEnvironmentalcategory> {
    let params = new HttpParams().set('page', queryParams.page).set('limit', queryParams.limit);
    return this.http.get<IEnvironmentalcategory>(`${this.apiUrl}/environmental-categories`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }
}
