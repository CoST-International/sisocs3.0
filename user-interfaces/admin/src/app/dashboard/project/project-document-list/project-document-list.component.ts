import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDocument, IDocumentData } from '../../../shared/interfaces/documents/IDocument';

@Component({
  selector: 'app-project-document-list',
  templateUrl: './project-document-list.component.html',
  styleUrls: ['./project-document-list.component.scss']
})
export class ProjectDocumentListComponent {

  @Input() addedDocuments!: IDocumentData;
  @Output() deleteEvent = new EventEmitter<any>();

  deleteDocument(id: number | string) {
    this.deleteEvent.emit(id)
  }

}
