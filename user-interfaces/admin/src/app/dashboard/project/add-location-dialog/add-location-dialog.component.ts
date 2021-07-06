import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatesService } from '../../data-standard/state/_services/states.service';
import { IStateAttributes } from 'src/app/shared/interfaces/state/IState';
import { ICityAttributes } from 'src/app/shared/interfaces/city/ICity';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IQueryparam } from 'src/app/shared/interfaces/queryparam/IQueryparam';
import {TooltipPosition} from '@angular/material/tooltip';
import { IProject, IProjectAttributes } from '../../../shared/interfaces/project/IProject';
import { of } from 'rxjs';
import { LocationService } from '../../../shared/services/location/location.service';
import { ILocation, ILocationAttributes } from 'src/app/shared/interfaces/location/ILocation';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';

@Component({
  selector: 'app-add-location-dialog',
  templateUrl: './add-location-dialog.component.html',
  styleUrls: ['./add-location-dialog.component.scss']
})
export class AddLocationDialogComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;

  locationForm!: FormGroup;

  queryParams!: IQueryparam;
  cities!: ICityAttributes[];
  states!: IStateAttributes[];
  stateCities!: IStateAttributes[];
  locations!: ILocation;

  filteredStates: Observable<IStateAttributes[]> | undefined;
  filteredCities: Observable<ICityAttributes[]> | undefined;

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];

  subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private _statesService: StatesService,
    private _locationService: LocationService,
    private _notificationService: NotificationService,
    public dialogRef: MatDialogRef<AddLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProjectAttributes) {
      this.getAllStates({ q: 'all', state: ''});
      console.log('Dialog Saved Project ID', data.id);
      console.log('Dialog Saved Project ', data);
    }

  ngOnInit(): void {
    this.setUpLocationForm();
  }

  setUpLocationForm(): void {
    this.locationForm = this.fb.group({
      'state_id': ['', [Validators.required]],
      'city_id': ['', [Validators.required]]
    });
  }

  saveLocation(formValue: FormGroup) {

    this.isLoading = true;
    
    let location: ILocationAttributes = {
      'id': '',
      'project_id': this.data?.id,
      'city_id': formValue.controls.city_id.value.id,
      'state_id': formValue.controls.state_id.value.id,
      'status_id': this.data?.status_id
    }

    this._locationService.addLocation(location).subscribe(
      (location) => {
        this.isLoading = false;
        this._notificationService.showSuccessNotification('Saved Successfully', 'Project Location has been added');
        this.closeDialog();
      },
      (error) => {
        this.isLoading = false;
      }
    )
  }

  onSelectState(selectedState: IStateAttributes): void {
    this.getCitiesByState({state: selectedState.state_name});
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getAllStates(queryParams: IQueryparam): void {
    this.isLoading = true;
    this.subscription = this._statesService.getAllStates(queryParams).subscribe(
      (states) => {
        this.isLoading = false;
        this.states = states?.data;
        console.log('States ', this.states);
        this.filteredStates = this.state?.valueChanges.pipe(
          startWith(''),
          map(value => this.filterStates(value))
        );
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  getCitiesByState(queryParams: IQueryparam): void {
    this.isLoading = true;
    this._statesService.getAllStates(queryParams).subscribe(
      (states) => {
        this.isLoading = false;
        this.city?.setValue(null);
        this.stateCities = states?.data;
        this.cities = this.stateCities[0]?.cities?.data;
        this.filteredCities = this.city?.valueChanges.pipe(
          startWith(''),
          map(value => this.filterCities(value))
        );
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }



  private filterStates(value: any): any[] {
    const filterValue = this.normalizeValue(value?.state_name || value);
    return this.states.filter(states => this.normalizeValue(states?.state_name).includes(filterValue));
  }

  private filterCities(value: any): any[] {
    const filterValue = this.normalizeValue(value?.city_name || value);
    return this.cities.filter(cities => this.normalizeValue(cities?.city_name).includes(filterValue));
  }

  private normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
  displayState(state: any) {
    return state ? state.state_name : '';
  }

  displayStateCity(state: any) {
    return state ? state.city_name : '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get state() {
    return this.locationForm.get('state_id');
  }

  get city() {
    return this.locationForm.get('city_id');
  }

}
