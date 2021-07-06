import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AdvancesService } from '../_services/advances.service';
import { ILink } from 'src/app/shared/interfaces/link/link';
import { IMeta } from 'src/app/shared/interfaces/meta/meta';
import { environment } from 'src/environments/environment';
import { IAdvanceData } from 'src/app/shared/interfaces/advance/IAdvance';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { ProjectService } from 'src/app/dashboard/project/_services/project.service';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-advance-list',
  templateUrl: './advance-list.component.html',
  styleUrls: ['./advance-list.component.scss']
})
export class AdvanceListComponent implements OnInit, AfterViewInit {

  isRequestLoading: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  advanceData!: IAdvanceData;
  displayedAdvanceColumns: string[] = ['#', 'Code', 'Advance', 'Status', 'Actions'];
  advanceDataSource = new MatTableDataSource<any>()

  length = 500;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25, 50, 100];
  showFirstLastButtons = true;

  subscription!: Subscription;

  constructor(
    public _authService: AuthService,
    private _projectService: ProjectService,
    private _advanceService: AdvancesService,
    private _notificationService: NotificationService
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects(page: number = 1, limit: number = 15) {
    let params = {
      page: page,
      limit: limit,
      organizationID: !this._authService.isAdmin() ? this._authService.getUserOrganization()['organization']['id'] : ''
    }
    this.isLoading = true;
    this.subscription = this._advanceService.getAllAdvances(params).subscribe(
      (advances) => {
        this.isLoading = false;
        this.advanceData = advances;
        this.advanceDataSource.data = this.advanceData.data;
        console.log('Advances ',  this.advanceDataSource.data);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }

  ngAfterViewInit() {
    this.advanceDataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.advanceDataSource.filter = filterValue.trim().toLowerCase();

    if (this.advanceDataSource.paginator) {
      this.advanceDataSource.paginator.firstPage();
    }
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getAllProjects(this.pageIndex, this.pageSize);
  }

  deleteProject(id: number | string): void {
    this.isRequestLoading = true;
    this.subscription = this._projectService.deleteProject(id).subscribe(
      (advance) => {
        this.isRequestLoading = false;
        this.getAllProjects();
        this._notificationService.showSuccessNotification('Deleted Successfully!', 'Advance has been deleted.')
      },
      (error) => {
        this.isRequestLoading = false;
      }
    )
  }


}
