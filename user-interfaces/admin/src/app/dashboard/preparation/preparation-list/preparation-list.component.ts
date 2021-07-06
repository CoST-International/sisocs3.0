import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ILink } from 'src/app/shared/interfaces/link/link';
import { IMeta } from 'src/app/shared/interfaces/meta/meta';
import { IPreparation, IPreparationData } from 'src/app/shared/interfaces/preparation/IPreparation';
import { PreparationService } from '../_services/preparation.service';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/auth/_services/auth.service';

@Component({
  selector: 'app-preparation-list',
  templateUrl: './preparation-list.component.html',
  styleUrls: ['./preparation-list.component.scss']
})
export class PreparationListComponent implements OnInit {

  isRequestLoading: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  preparationData!: IPreparationData;
  displayedPreparationColumns: string[] = ['#', 'Project', 'Budget', 'Budget Approval Date', 'Scope', 'Status', 'Actions'];
  preparationDataSource = new MatTableDataSource<any>();

  length = 500;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25, 50, 100];
  showFirstLastButtons = true;

  subscription!: Subscription;

  constructor(
    public _authService: AuthService,
    private _preparationService: PreparationService,
    private _notificationService: NotificationService
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    this.getAllPreparations();
  }

  getAllPreparations(page: number = 1, limit: number = 15) {
    let params = {
      page: page,
      limit: limit,
      organizationID: !this._authService.isAdmin() ? this._authService.getUserOrganization()['organization']['id'] : ''
    }
    this.isRequestLoading = true;
    this.subscription = this._preparationService.getAllPreparations(params).subscribe(
      (preparations) => {
        this.isRequestLoading = false;
        this.preparationData = preparations;
        this.preparationDataSource.data = this.preparationData.data;
      },
      (error) => {
        this.isRequestLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }

  ngAfterViewInit() {
    this.preparationDataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.preparationDataSource.filter = filterValue.trim().toLowerCase();

    if (this.preparationDataSource.paginator) {
      this.preparationDataSource.paginator.firstPage();
    }
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getAllPreparations(this.pageIndex, this.pageSize);
  }

  deletePreparation(id: number | string): void {
    this.isRequestLoading = true;
    this.subscription = this._preparationService.deletePreparation(id).subscribe(
      (preparation) => {
        this.isRequestLoading = false;
        this.getAllPreparations();
        this._notificationService.showSuccessNotification('Deleted Successfully!', 'Preparation has been deleted.')
      },
      (error) => {

      }
    )
  }

}
