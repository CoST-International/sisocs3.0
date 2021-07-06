import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { CompletionService } from '../_services/completion.service';
import { ILink } from 'src/app/shared/interfaces/link/link';
import { IMeta } from 'src/app/shared/interfaces/meta/meta';
import { environment } from 'src/environments/environment';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { ICompletionData } from 'src/app/shared/interfaces/completion/ICompletion';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';

@Component({
  selector: 'app-ending-list',
  templateUrl: './ending-list.component.html',
  styleUrls: ['./ending-list.component.scss']
})
export class EndingListComponent implements OnInit, AfterViewInit {

  isRequestLoading: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  completionData!: ICompletionData;
  displayedCompletionColumns: string[] = ['#', 'Project', 'Date', 'Cost', 'Status', 'Actions'];
  completionDataSource = new MatTableDataSource<any>()

  length = 500;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25, 50, 100];
  showFirstLastButtons = true;

  subscription!: Subscription;

  constructor(
    public _authService: AuthService,
    private _completionService: CompletionService,
    private _notificationService: NotificationService
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    this.getAllCompletions();
  }

  getAllCompletions(page: number = 1, limit: number = 15) {
    let params = {
      page: page,
      limit: limit,
      organizationID: !this._authService.isAdmin() ? this._authService.getUserOrganization()['organization']['id'] : ''
    }
    this.isLoading = true;
    this.subscription = this._completionService.getAllCompletions(params).subscribe(
      completions => {
        this.isLoading = false;
        this.completionData = completions;
        this.completionDataSource.data = this.completionData.data;
      },
      error => {
        this.isLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }

  ngAfterViewInit() {
    this.completionDataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.completionDataSource.filter = filterValue.trim().toLowerCase();

    if (this.completionDataSource.paginator) {
      this.completionDataSource.paginator.firstPage();
    }
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getAllCompletions(this.pageIndex, this.pageSize);
  }

  deleteCompletion(id: number | string): void {
    this.isRequestLoading = true;
    this.subscription = this._completionService.deleteCompletion(id).subscribe(
      (completion) => {
        this.isRequestLoading = false;
        this.getAllCompletions();
        this._notificationService.showSuccessNotification('Deleted Successfully!', 'Completion has been deleted.')
      },
      (error) => {
        this.isRequestLoading = false;
      }
    )
  }

}
