import { HttpClient, HttpParams } from '@angular/common/http';
import { IContract, IContractAttributes, IContractData } from 'src/app/shared/interfaces/contract/IContract';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContractService {


  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllContracts(queryParams?: any): Observable<IContractData> {
    let params = new HttpParams()
      .set('page', queryParams.page)
      .set('limit', queryParams.limit)
      .set('relation', queryParams.relation)
      .set('organization', queryParams.organizationID);
    return this.http.get<IContractData>(`${this.apiUrl}/contracts`, { params: params }).pipe(
        tap(data => data),
        // catchError(this.handleError)
      );
  }

  addContract(contract: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contracts`, contract)
    .pipe(
      // catchError(this.handleError('addContract', IContract))
    );
  }

  updateContract(contract: IContractAttributes, id: number | string): Observable<IContractAttributes> {
    return this.http.patch<IContractAttributes>(`${this.apiUrl}/contracts/${id}`, contract)
    .pipe(
      // catchError(this.handleError('updateContract', IContract))
    );
  }

  getContractById(id: number | string): Observable<IContract>{
    return this.http.get<IContract>(`${this.apiUrl}/contracts/${id}`)
      .pipe(
        tap(data => data)
        // catchError(this.handleError)
      );
  }


  deleteContract(id: number | string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/contracts/${id}`)
      .pipe(
        // catchError(this.handleError('deleteContract'))
      );
  }
}
