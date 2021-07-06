import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDocument, IDocumentData } from 'src/app/shared/interfaces/documents/IDocument';

@Component({
  selector: 'app-award-document-list',
  templateUrl: './award-document-list.component.html',
  styleUrls: ['./award-document-list.component.scss']
})
export class AwardDocumentListComponent {

  @Input() addedDocuments!: IDocumentData;
  @Output() deleteEvent = new EventEmitter<any>();

  deleteDocument(id: number | string) {
    this.deleteEvent.emit(id)
  }

}
