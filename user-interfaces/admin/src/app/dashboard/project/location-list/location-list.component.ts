import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ILocation } from '../../../shared/interfaces/location/ILocation';
import { LocationService } from '../../../shared/services/location/location.service';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent {

  @Input() addedLocations!: ILocation;
  @Output() deleteEvent = new EventEmitter<any>();

  deleteLocation(id: number | string) {
    this.deleteEvent.emit(id)
  }

}
