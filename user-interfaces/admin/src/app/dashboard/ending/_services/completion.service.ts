import { HttpClient, HttpParams } from '@angular/common/http';
import { ICompletion, ICompletionAttributes, ICompletionData } from 'src/app/shared/interfaces/completion/ICompletion';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompletionService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllCompletions(queryParams?: any): Observable<ICompletionData> {
    let params = new HttpParams()
    .set('page', queryParams.page)
    .set('limit', queryParams.limit)
    .set('q', queryParams.q)
    .set('relation', queryParams.relation)
    .set('organization', queryParams.organizationID);

    return this.http.get<ICompletionData>(`${this.apiUrl}/completions`, { params: params }).pipe(
      tap(data => data),
      // catchError(this.handleError)
    );
  }

  addCompletion(completion: ICompletionAttributes): Observable<ICompletion> {
    return this.http.post<ICompletion>(`${this.apiUrl}/completions`, completion)
    .pipe(
      // catchError(this.handleError('addCompletion', ICompletion))
    );
  }

  updateCompletion(completion: ICompletionAttributes, id: number | string): Observable<ICompletionAttributes> {
    return this.http.patch<ICompletionAttributes>(`${this.apiUrl}/completions/${id}`, completion)
    .pipe(
      // catchError(this.handleError('updateCompletion', ICompletion))
    );
  }

  getCompletionById(id: number | string): Observable<ICompletion>{
    return this.http.get<ICompletion>(`${this.apiUrl}/completions/${id}`)
      .pipe(
        tap(data => data)
        // catchError(this.handleError)
      );
  }


  deleteCompletion(id: number | string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/completions/${id}`)
      .pipe(
        // catchError(this.handleError('deleteCompletion'))
      );
  }
}
