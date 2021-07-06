import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { IOrganizationunit, IOrganizationunitData } from 'src/app/shared/interfaces/organization-unit/IOrganizationunit';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { EntitiesService } from '../../entities/_services/entities.service';
import { OrganizationUnitService } from '../_services/organization-unit.service';

@Component({
  selector: 'app-organization-unit-list',
  templateUrl: './organization-unit-list.component.html',
  styleUrls: ['./organization-unit-list.component.scss']
})
export class OrganizationUnitListComponent implements OnInit, AfterViewInit {

  isRequestLoading: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  entityUnitData!: IOrganizationunitData;
  displayedEntityUnitColumns: string[] = ['#', 'Entity Unit', 'Entity', 'Actions'];
  entityUnitDataSource = new MatTableDataSource<any>()

  length = 500;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25, 50, 100];
  showFirstLastButtons = true;

  subscription!: Subscription;

  constructor(
    private _authService: AuthService,
    private _entityUnitService: OrganizationUnitService,
    private _notificationService: NotificationService
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    this.getAllEntityUnits();
  }

  getAllEntityUnits(page: number = 1, limit: number = 15) {
    let params = {
      page: page,
      limit: limit,
      organizationID: !this._authService.isAdmin() ? this._authService.getUserOrganization()['organization']['id'] : ''
    }
    this.isRequestLoading = true;
    this.subscription = this._entityUnitService.getAllEntityUnits(params).subscribe(
      (entityUnits) => {
        this.isRequestLoading = false;
        this.entityUnitData = entityUnits;
        this.entityUnitDataSource.data = this.entityUnitData.data;
      },
      (error) => {
        this.isRequestLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }

  ngAfterViewInit() {
    this.entityUnitDataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.entityUnitDataSource.filter = filterValue.trim().toLowerCase();

    if (this.entityUnitDataSource.paginator) {
      this.entityUnitDataSource.paginator.firstPage();
    }
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getAllEntityUnits(this.pageIndex, this.pageSize);
  }

  deleteEntityUnit(id: number | string): void {
    this.isRequestLoading = true;
    this.subscription = this._entityUnitService.deleteEntityUnit(id).subscribe(
      (enity) => {
        this.isRequestLoading = false;
        this.getAllEntityUnits();
        this._notificationService.showSuccessNotification('Deleted Successfully!', 'Entity has been deleted.')
      },
      (error) => {
        this.isRequestLoading = false;
      }
    )
  }


}


