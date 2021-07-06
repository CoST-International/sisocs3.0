import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { IOrganization, IOrganizationData } from '../../../../shared/interfaces/organization/IOrganization';
import { EntitiesService } from '../_services/entities.service';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss']
})
export class EntityListComponent implements OnInit, AfterViewInit {

  isRequestLoading: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  entityData!: IOrganizationData;
  displayedEntityColumns: string[] = ['#', 'Identifier', 'Entity', 'Actions'];
  entityDataSource = new MatTableDataSource<any>()

  length = 500;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25, 50, 100];
  showFirstLastButtons = true;

  subscription!: Subscription;

  constructor(
    public _authService: AuthService,
    private _entityService: EntitiesService,
    private _notificationService: NotificationService
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    this.getAllEntities();
  }

  getAllEntities(page: number = 1, limit: number = 20) {
    let params = {
      page: page,
      limit: limit,
      organizationID: !this._authService.isAdmin() ? this._authService.getUserOrganization()['organization']['id'] : ''
    }
    this.isRequestLoading = true;
    this.subscription = this._entityService.getAllEntities(params).subscribe(
      (entities) => {
        this.isRequestLoading = false;
        this.entityData = entities;
        this.entityDataSource.data = this.entityData.data;
      },
      (error) => {
        this.isRequestLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }

  ngAfterViewInit() {
    this.entityDataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.entityDataSource.filter = filterValue.trim().toLowerCase();

    if (this.entityDataSource.paginator) {
      this.entityDataSource.paginator.firstPage();
    }
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getAllEntities(this.pageIndex, this.pageSize);
  }

  deleteEntity(id: number | string): void {
    this.isRequestLoading = true;
    this.subscription = this._entityService.deleteEntity(id).subscribe(
      (project) => {
        this.isRequestLoading = false;
        this.getAllEntities();
        this._notificationService.showSuccessNotification('Deleted Successfully!', 'Entity has been deleted.')
      },
      (error) => {
        this.isRequestLoading = false;
      }
    )
  }


}

