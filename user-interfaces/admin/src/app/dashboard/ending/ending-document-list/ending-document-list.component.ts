import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDocument, IDocumentData } from 'src/app/shared/interfaces/documents/IDocument';

@Component({
  selector: 'app-ending-document-list',
  templateUrl: './ending-document-list.component.html',
  styleUrls: ['./ending-document-list.component.scss']
})
export class EndingDocumentListComponent {

  @Input() addedDocuments!: IDocumentData;
  @Output() deleteEvent = new EventEmitter<any>();

  deleteDocument(id: number | string) {
    this.deleteEvent.emit(id)
  }

}
