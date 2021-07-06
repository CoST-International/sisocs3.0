import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { IContractData } from 'src/app/shared/interfaces/contract/IContract';
import { ILink } from 'src/app/shared/interfaces/link/link';
import { IMeta } from 'src/app/shared/interfaces/meta/meta';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { environment } from 'src/environments/environment';
import { ContractService } from '../_services/contract.service';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss']
})
export class ContractListComponent implements OnInit {
  isRequestLoading: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  contractData!: IContractData;
  displayedContractColumns: string[] = ['#', 'Project', 'Contract Number', 'Title', 'Amount', 'Period', 'Status', 'Actions'];
  contractDataSource = new MatTableDataSource<any>()

  length = 500;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25, 50, 100];
  showFirstLastButtons = true;

  subscription!: Subscription;

  constructor(
    public _authService: AuthService,
    private _contractService: ContractService,
    private _notificationService: NotificationService
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    this.getAllContracts();
  }

  getAllContracts(page: number = 1, limit: number = 15) {
    let params = {
      page: page,
      limit: limit,
      organizationID: !this._authService.isAdmin() ? this._authService.getUserOrganization()['organization']['id'] : ''
    }
    this.isLoading = true;
    this.subscription = this._contractService.getAllContracts(params).subscribe(
      contracts => {
        this.isLoading = false;
        this.contractData = contracts;
        this.contractDataSource.data = this.contractData.data;
      },
      error => {
        this.isLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }

  ngAfterViewInit() {
    this.contractDataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.contractDataSource.filter = filterValue.trim().toLowerCase();

    if (this.contractDataSource.paginator) {
      this.contractDataSource.paginator.firstPage();
    }
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getAllContracts(this.pageIndex, this.pageSize);
  }

  deleteContract(id: number | string): void {
    this.isRequestLoading = true;
    this.subscription = this._contractService.deleteContract(id).subscribe(
      (contract) => {
        this.isRequestLoading = false;
        this.getAllContracts();
        this._notificationService.showSuccessNotification('Deleted Successfully!', 'Contract has been deleted.')
      },
      (error) => {
        this.isRequestLoading = false;

      }
    )
  }

}
