import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDocument, IDocumentData } from 'src/app/shared/interfaces/documents/IDocument';

@Component({
  selector: 'app-prequalification-document-list',
  templateUrl: './prequalification-document-list.component.html',
  styleUrls: ['./prequalification-document-list.component.scss']
})
export class PrequalificationDocumentListComponent {

  @Input() addedDocuments!: IDocumentData;
  @Output() deleteEvent = new EventEmitter<any>();

  deleteDocument(id: number | string) {
    this.deleteEvent.emit(id)
  }

}
