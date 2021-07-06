import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { IUserData } from 'src/app/shared/interfaces/user/IUser';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  isRequestLoading: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  userData!: IUserData;
  displayedUserColumns: string[] = ['#', 'Name', 'Email', 'Organization', 'Role', 'Actions'];
  userDataSource = new MatTableDataSource<any>()

  length = 500;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25, 50, 100];
  showFirstLastButtons = true;

  subscription!: Subscription;

  constructor(
    public _authService: AuthService,
    private _userService: UsersService,
    private _notificationService: NotificationService
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(page: number = 1, limit: number = 15) {
    let params = {
      page: page,
      limit: limit,
      organizationID: !this._authService.isAdmin() ? this._authService.getUserOrganization()['organization']['id'] : ''
    }
    this.isRequestLoading = true;
    this.subscription = this._userService.getAllUsers(params).subscribe(
      users => {
        this.isRequestLoading = false;
        this.userData = users;
        this.userDataSource.data = this.userData?.data;
      },
      error => {
        this.isRequestLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }

  ngAfterViewInit() {
    this.userDataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userDataSource.filter = filterValue.trim().toLowerCase();

    if (this.userDataSource.paginator) {
      this.userDataSource.paginator.firstPage();
    }
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getAllUsers(this.pageIndex, this.pageSize);
  }

  deleteUser(id: number | string): void {
    this.isRequestLoading = true;
    this.subscription = this._userService.deleteUser(id).subscribe(
      (user) => {
        this.isRequestLoading = false;
        this.getAllUsers();
        this._notificationService.showSuccessNotification('Deleted Successfully!', 'User has been deleted.')
      },
      (error) => {
        this.isRequestLoading = false;
      }
    )
  }

}
