import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { IExecutionData } from 'src/app/shared/interfaces/execution/IExecution';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { ExecutionService } from '../_services/execution.service';

@Component({
  selector: 'app-executions-list',
  templateUrl: './executions-list.component.html',
  styleUrls: ['./executions-list.component.scss']
})
export class ExecutionsListComponent implements OnInit, AfterViewInit {

  isRequestLoading: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  executionData!: IExecutionData;
  displayedExecutionColumns: string[] = ['#', 'Program', 'Status', 'Actions'];
  executionDataSource = new MatTableDataSource<any>()

  length = 500;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25, 50, 100];
  showFirstLastButtons = true;

  subscription!: Subscription;

  constructor(
    public _authService: AuthService,
    private _executionService: ExecutionService,
    private _notificationService: NotificationService
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    this.getAllExecutions();
  }

  getAllExecutions(page: number = 1, limit: number = 15) {
    let params = {
      page: page,
      limit: limit,
      organizationID: !this._authService.isAdmin() ? this._authService.getUserOrganization()['organization']['id'] : ''
    };
    this.isLoading = true;
    this.subscription = this._executionService.getAllExecutions(params).subscribe(
      (executions) => {
        this.isLoading = false;
        this.executionData = executions;
        this.executionDataSource.data = this.executionData.data;
        console.log('Executions ',  this.executionDataSource.data);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }

  ngAfterViewInit() {
    this.executionDataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.executionDataSource.filter = filterValue.trim().toLowerCase();

    if (this.executionDataSource.paginator) {
      this.executionDataSource.paginator.firstPage();
    }
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getAllExecutions(this.pageIndex, this.pageSize);
  }

  deleteExecution(id: number | string): void {
    this.isRequestLoading = true;
    this.subscription = this._executionService.deleteExecution(id).subscribe(
      (execution) => {
        this.isRequestLoading = false;
        this.getAllExecutions();
        this._notificationService.showSuccessNotification('Deleted Successfully!', 'Execution has been deleted.')
      },
      (error) => {
        this.isRequestLoading = false;
      }
    )
  }


}
