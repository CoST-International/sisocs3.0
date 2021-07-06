import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { ILink } from 'src/app/shared/interfaces/link/link';
import { IMeta } from 'src/app/shared/interfaces/meta/meta';
import { ITenderData } from 'src/app/shared/interfaces/tender/ITender';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { environment } from 'src/environments/environment';
import { AcquisitionsService } from '../_services/acquisitions.service';

@Component({
  selector: 'app-acquisition-list',
  templateUrl: './acquisition-list.component.html',
  styleUrls: ['./acquisition-list.component.scss']
})
export class AcquisitionListComponent implements OnInit {

  isRequestLoading: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  tenderData!: ITenderData;
  displayedTenderColumns: string[] = ['#', 'Project', 'Process', 'Process Name', 'Status', 'Actions'];
  tenderDataSource = new MatTableDataSource<any>()

  length = 500;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25, 50, 100];
  showFirstLastButtons = true;

  subscription!: Subscription;

  constructor(
    public _authService: AuthService,
    private _tenderService: AcquisitionsService,
    private _notificationService: NotificationService
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    this.getAllTenders();
  }

  getAllTenders(page: number = 1, limit: number = 15) {
    let params = {
      page: page,
      limit: limit,
      organizationID: !this._authService.isAdmin() ? this._authService.getUserOrganization()['organization']['id'] : ''
    }
    this.isLoading = true;
    this.subscription = this._tenderService.getAllTenders(params).subscribe(
      (tenders) => {
        this.isLoading = false;
        this.tenderData = tenders;
        this.tenderDataSource.data = this.tenderData.data;
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }

  ngAfterViewInit() {
    this.tenderDataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tenderDataSource.filter = filterValue.trim().toLowerCase();

    if (this.tenderDataSource.paginator) {
      this.tenderDataSource.paginator.firstPage();
    }
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getAllTenders(this.pageIndex, this.pageSize);
  }

  deleteTender(id: number | string): void {
    this.isRequestLoading = true;
    this.subscription = this._tenderService.deleteTender(id).subscribe(
      (tender) => {
        this.isRequestLoading = false;
        this.getAllTenders();
        this._notificationService.showSuccessNotification('Deleted Successfully!', 'Tender has been deleted.')
      },
      (error) => {

      }
    )
  }

}
