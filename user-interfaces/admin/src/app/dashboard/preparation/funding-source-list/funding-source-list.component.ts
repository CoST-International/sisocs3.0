import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProjectFundingSource } from '../../../shared/interfaces/project-funding-source/IProjectfundingsource';

@Component({
  selector: 'app-funding-source-list',
  templateUrl: './funding-source-list.component.html',
  styleUrls: ['./funding-source-list.component.scss']
})
export class FundingSourceListComponent {

  @Input() addedProjectFundingSources!: IProjectFundingSource;
  @Output() deleteEvent = new EventEmitter<any>();

  deleteFundingSource(id: number | string) {
    this.deleteEvent.emit(id)
  }

}
