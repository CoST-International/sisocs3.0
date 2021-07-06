import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITenderOfferer, ITenderOffererData } from 'src/app/shared/interfaces/tender-offerer/TenderOfferer';

@Component({
  selector: 'app-tender-offerers-list',
  templateUrl: './tender-offerers-list.component.html',
  styleUrls: ['./tender-offerers-list.component.scss']
})
export class TenderOfferersListComponent {

  @Input() addedTenderOfferers!: ITenderOffererData;
  @Output() deleteEvent = new EventEmitter<any>();

  deleteTenderOfferer(id: number | string) {
    this.deleteEvent.emit(id)
  }

}
