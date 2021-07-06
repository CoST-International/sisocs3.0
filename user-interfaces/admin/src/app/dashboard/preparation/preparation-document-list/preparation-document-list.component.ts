import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDocument, IDocumentData } from 'src/app/shared/interfaces/documents/IDocument';

@Component({
  selector: 'app-preparation-document-list',
  templateUrl: './preparation-document-list.component.html',
  styleUrls: ['./preparation-document-list.component.scss']
})
export class PreparationDocumentListComponent {

  @Input() addedDocuments!: IDocumentData;
  @Output() deleteEvent = new EventEmitter<any>();

  deleteDocument(id: number | string) {
    this.deleteEvent.emit(id)
  }

}
