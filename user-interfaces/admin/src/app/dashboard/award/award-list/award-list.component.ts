import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AwardService } from '../_services/award.service';
import { ILink } from 'src/app/shared/interfaces/link/link';
import { IMeta } from 'src/app/shared/interfaces/meta/meta';
import { environment } from 'src/environments/environment';
import { IAwardData } from 'src/app/shared/interfaces/award/IAward';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/auth/_services/auth.service';

@Component({
  selector: 'app-award-list',
  templateUrl: './award-list.component.html',
  styleUrls: ['./award-list.component.scss']
})
export class AwardListComponent implements OnInit, AfterViewInit {

  isRequestLoading: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  awardData!: IAwardData;
  displayedAwardColumns: string[] = ['#', 'Project', 'Award Number', 'Estimated Cost', 'Status', 'Actions'];
  awardDataSource = new MatTableDataSource<any>()

  length = 500;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25, 50, 100];
  showFirstLastButtons = true;

  subscription!: Subscription;

  constructor(
    public _authService: AuthService,
    private _awardService: AwardService,
    private _notificationService: NotificationService
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    this.getAllAwards();
  }

  getAllAwards(page: number = 1, limit: number = 15) {
    let params = {
      page: page,
      limit: limit
    }
    this.isLoading = true;
    this.subscription = this._awardService.getAllAwards(params).subscribe(
      awards => {
        this.isLoading = false;
        this.awardData = awards;
        this.awardDataSource.data = this.awardData.data;
      },
      error => {
        this.isLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }

  ngAfterViewInit() {
    this.awardDataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.awardDataSource.filter = filterValue.trim().toLowerCase();

    if (this.awardDataSource.paginator) {
      this.awardDataSource.paginator.firstPage();
    }
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getAllAwards(this.pageIndex, this.pageSize);
  }

  deleteAward(id: number | string): void {
    this.isRequestLoading = true;
    this.subscription = this._awardService.deleteAward(id).subscribe(
      (award) => {
        this.isRequestLoading = false;
        this.getAllAwards();
        this._notificationService.showSuccessNotification('Deleted Successfully!', 'Award has been deleted.')
      },
      (error) => {
        this.isRequestLoading = false;
      }
    )
  }
}
