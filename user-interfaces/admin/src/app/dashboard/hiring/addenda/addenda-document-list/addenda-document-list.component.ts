import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IDocumentData } from 'src/app/shared/interfaces/documents/IDocument';

@Component({
  selector: 'app-addenda-document-list',
  templateUrl: './addenda-document-list.component.html',
  styleUrls: ['./addenda-document-list.component.scss']
})
export class AddendaDocumentListComponent {

  @Input() addedDocuments!: IDocumentData;
  @Output() deleteEvent = new EventEmitter<any>();

  deleteDocument(id: number | string) {
    this.deleteEvent.emit(id)
  }

}
