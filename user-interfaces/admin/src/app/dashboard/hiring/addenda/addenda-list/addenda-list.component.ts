import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { ProjectService } from 'src/app/dashboard/project/_services/project.service';
import { IAddendumData } from 'src/app/shared/interfaces/addendum/IAddendum';
import { ILink } from 'src/app/shared/interfaces/link/link';
import { IMeta } from 'src/app/shared/interfaces/meta/meta';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { environment } from 'src/environments/environment';
import { AddendaService } from '../_services/addenda.service';

@Component({
  selector: 'app-addenda-list',
  templateUrl: './addenda-list.component.html',
  styleUrls: ['./addenda-list.component.scss']
})
export class AddendaListComponent implements OnInit, AfterViewInit {

  isRequestLoading: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  addendumData!: IAddendumData;
  displayedProjectColumns: string[] = ['#', 'Contract Number', 'Qualification', 'Status', 'Actions'];
  addendumDataSource = new MatTableDataSource<any>()

  length = 500;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25, 50, 100];
  showFirstLastButtons = true;

  subscription!: Subscription;

  constructor(
    public _authService: AuthService,
    private _addendaService: AddendaService,
    private _projectService: ProjectService,
    private _notificationService: NotificationService
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    this.getAllAddenda();
  }

  getAllAddenda(page: number = 1, limit: number = 15) {
    let params = {
      page: page,
      limit: limit,
    }
    this.isLoading = true;
    this.subscription = this._addendaService.getAllAddenda(params).subscribe(
      (addenda) => {
        this.isLoading = false;
        this.addendumData = addenda;
        this.addendumDataSource.data = this.addendumData.data;
        console.log('Projects ',  this.addendumDataSource.data);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }

  ngAfterViewInit() {
    this.addendumDataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.addendumDataSource.filter = filterValue.trim().toLowerCase();

    if (this.addendumDataSource.paginator) {
      this.addendumDataSource.paginator.firstPage();
    }
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getAllAddenda(this.pageIndex, this.pageSize);
  }

  deleteAddedum(id: number | string): void {
    this.isRequestLoading = true;
    this.subscription = this._addendaService.deleteAddendum(id).subscribe(
      (project) => {
        this.isRequestLoading = false;
        this.getAllAddenda();
        this._notificationService.showSuccessNotification('Deleted Successfully!', 'Addendum has been deleted.')
      },
      (error) => {
        this.isRequestLoading = false;
      }
    )
  }


}
