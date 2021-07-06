import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { ILink } from 'src/app/shared/interfaces/link/link';
import { IMeta } from 'src/app/shared/interfaces/meta/meta';
import { IPrequalificationData } from 'src/app/shared/interfaces/prequalification/IPrequalification';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { environment } from 'src/environments/environment';
import { PrequalificationService } from '../_services/prequalification.service';

@Component({
  selector: 'app-prequalification-list',
  templateUrl: './prequalification-list.component.html',
  styleUrls: ['./prequalification-list.component.scss']
})
export class PrequalificationListComponent implements OnInit {

  isRequestLoading: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  prequalificationData!: IPrequalificationData;
  displayedPrequalificationColumns: string[] = ['#', 'Project', 'Number', 'Start', 'End', 'Status', 'Actions'];
  prequalificationDataSource = new MatTableDataSource<any>();

  length = 500;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25, 50, 100];
  showFirstLastButtons = true;

  subscription!: Subscription;

  constructor(
    public _authService: AuthService,
    private _notificationService: NotificationService,
    private _prequalificationService: PrequalificationService,
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    this.getAllPrequalifications();
  }

  getAllPrequalifications(page: number = 1, limit: number = 15) {
    let params = {
      page: page,
      limit: limit,
      organizationID: !this._authService.isAdmin() ? this._authService.getUserOrganization()['organization']['id'] : ''
    }
    this.isLoading = true;
    this.subscription = this._prequalificationService.getAllPrequalifications(params).subscribe(
      prequalifications => {
        this.isLoading = false;
        this.prequalificationData = prequalifications;
        this.prequalificationDataSource.data = this.prequalificationData.data;
      },
      error => {
        this.isLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }

  ngAfterViewInit() {
    this.prequalificationDataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.prequalificationDataSource.filter = filterValue.trim().toLowerCase();

    if (this.prequalificationDataSource.paginator) {
      this.prequalificationDataSource.paginator.firstPage();
    }
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getAllPrequalifications(this.pageIndex, this.pageSize);
  }

  deletePrequalification(id: number | string): void {
    this.isRequestLoading = true;
    this.subscription = this._prequalificationService.deletePrequalification(id).subscribe(
      (prequalification) => {
        this.isRequestLoading = false;
        this.getAllPrequalifications();
        this._notificationService.showSuccessNotification('Deleted Successfully!', 'Prequalification has been deleted.')
      },
      (error) => {

      }
    )
  }

}
