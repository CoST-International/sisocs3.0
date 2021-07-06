import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { IRoleData } from 'src/app/shared/interfaces/role/IRole';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { RoleService } from '../_services/roles/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit, AfterViewInit {

  isRequestLoading: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  roleData!: IRoleData;
  displayedRoleColumns: string[] = ['#', 'Role', 'Actions'];
  roleDataSource = new MatTableDataSource<any>()

  length = 500;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25, 50, 100];
  showFirstLastButtons = true;

  subscription!: Subscription;

  constructor(
    private _authService: AuthService,
    private _roleService: RoleService,
    private _notificationService: NotificationService
  ) {
    this.getAllRoles();
  }

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {

  }

  getAllRoles(page: number = 1, limit: number = 30) {
    let params = {
      page: page,
      limit: limit,
    };

    this.isRequestLoading = true;

    this.subscription = this._roleService.getAllRoles(params).subscribe(
      (roles) => {
        this.isRequestLoading = false;
        this.roleData = roles;
        this.roleDataSource.data = this.roleData?.data;
        console.log('Data ', this.roleData?.data);
      },
      (error) => {
        this.isRequestLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }

  ngAfterViewInit() {
    this.roleDataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.roleDataSource.filter = filterValue.trim().toLowerCase();

    if (this.roleDataSource.paginator) {
      this.roleDataSource.paginator.firstPage();
    }
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getAllRoles(this.pageIndex, this.pageSize);
  }


}

