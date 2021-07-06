import { HttpClient, HttpParams } from '@angular/common/http';
import { IDocument, IDocumentData } from '../../../shared/interfaces/documents/IDocument';

import { IDocumentAttributes } from 'src/app/shared/interfaces/documents/IDocument';
import { IQueryparam } from 'src/app/shared/interfaces/queryparam/IQueryparam';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getAllDocuments(queryParams: IQueryparam): Observable<IDocumentData> {
    let params = new HttpParams().set('q', queryParams.q ? queryParams.q : '')
    .set('project', queryParams.projectID ? queryParams.projectID : '')
    .set('section', queryParams.section ? queryParams.section : '');
    return this.http.get<IDocumentData>(`${this.apiUrl}/documents`, { params: params })
  }


  addDocument(document: any, file: any): Observable<IDocumentAttributes> {

    let documentFormData = new FormData();
    documentFormData.append('section_id', document.section_id);
    documentFormData.append('project_id', document.project_id);
    documentFormData.append('document_type_id', document.document_types_id);
    documentFormData.append('document_qualification', document.document_qualification);
    documentFormData.append('document_description', document.document_description);
    documentFormData.append('document_file', file, file.name);
    documentFormData.append('document_title', document.document_title);
    documentFormData.append('document_author', document.document_author);
    documentFormData.append('document_language', document.document_language);
    documentFormData.append('document_published', document.document_published);
    documentFormData.append('document_start', document.document_start);
    documentFormData.append('document_end', document.document_end);

    return this.http.post<IDocumentAttributes>(`${this.apiUrl}/documents`, documentFormData)
      .pipe(
        // catchError(this.handleError('addDocument', any))
      );
  }

  updateDocument(document: any, id: number | string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/documents/${id}`, document)
    .pipe(
      // catchError(this.handleError('updateDocument', any))
    );
  }

  getDocumentById(id: number | string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/documents/${id}`).pipe(
      tap(data => data)
      // catchError(this.handleError)
    );
  }


  deleteDocument(id: number | string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/documents/${id}`)
      .pipe(
        // catchError(this.handleError('deleteDocument'))
      );
  }
}
