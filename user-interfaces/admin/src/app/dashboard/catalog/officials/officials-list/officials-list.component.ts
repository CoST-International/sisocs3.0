import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { IOfficialData } from 'src/app/shared/interfaces/official/IOfficial';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { EntitiesService } from '../../entities/_services/entities.service';
import { OfficialsService } from '../_services/officials.service';

@Component({
  selector: 'app-officials-list',
  templateUrl: './officials-list.component.html',
  styleUrls: ['./officials-list.component.scss']
})
export class OfficialsListComponent implements OnInit, AfterViewInit {

  isRequestLoading: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  officialsData!: IOfficialData;
  displayedOfficialsColumns: string[] = ['#', 'Full Name of the Official', 'Actions'];
  officialsDataSource = new MatTableDataSource<any>()

  length = 500;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25, 50, 100];
  showFirstLastButtons = true;

  subscription!: Subscription;

  constructor(
    public _authService: AuthService,
    private _officialService: OfficialsService,
    private _notificationService: NotificationService
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    this.getAllOfficials();
  }

  getAllOfficials(page: number = 1, limit: number = 15) {
    let params = {
      page: page,
      limit: limit,
      organizationID: !this._authService.isAdmin() ? this._authService.getUserOrganization()['organization']['id'] : ''
    }
    this.isRequestLoading = true;
    this.subscription = this._officialService.getAllOfficials(params).subscribe(
      (officials) => {
        this.isRequestLoading = false;
        this.officialsData = officials;
        this.officialsDataSource.data = this.officialsData.data;
      },
      (error) => {
        this.isRequestLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }

  ngAfterViewInit() {
    this.officialsDataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.officialsDataSource.filter = filterValue.trim().toLowerCase();

    if (this.officialsDataSource.paginator) {
      this.officialsDataSource.paginator.firstPage();
    }
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getAllOfficials(this.pageIndex, this.pageSize);
  }

  deleteOfficial(id: number | string): void {
    this.isRequestLoading = true;
    this.subscription = this._officialService.deleteOfficial(id).subscribe(
      (official) => {
        this.isRequestLoading = false;
        this.getAllOfficials();
        this._notificationService.showSuccessNotification('Deleted Successfully!', 'Officials has been deleted.')
      },
      (error) => {
        this.isRequestLoading = false;
      }
    )
  }


}
