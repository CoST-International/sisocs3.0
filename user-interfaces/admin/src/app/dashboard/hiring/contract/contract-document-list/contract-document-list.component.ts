import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDocument, IDocumentData } from 'src/app/shared/interfaces/documents/IDocument';

@Component({
  selector: 'app-contract-document-list',
  templateUrl: './contract-document-list.component.html',
  styleUrls: ['./contract-document-list.component.scss']
})
export class ContractDocumentListComponent {

  @Input() addedDocuments!: IDocumentData;
  @Output() deleteEvent = new EventEmitter<any>();

  deleteDocument(id: number | string) {
    this.deleteEvent.emit(id)
  }


}
