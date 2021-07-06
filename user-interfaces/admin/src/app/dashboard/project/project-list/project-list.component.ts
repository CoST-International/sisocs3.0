import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IProjectData } from 'src/app/shared/interfaces/project/IProject';
import { ProjectService } from '../_services/project.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PageEvent} from '@angular/material/paginator';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/_services/auth.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})

export class ProjectListComponent implements OnInit, AfterViewInit {

  isRequestLoading: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  projectData!: IProjectData;
  displayedProjectColumns: string[] = ['#', 'Code', 'Project', 'Status', 'Actions'];
  projectDataSource = new MatTableDataSource<any>()

  length = 500;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25, 50, 100];
  showFirstLastButtons = true;

  subscription!: Subscription;

  constructor(
    public _authService: AuthService,
    private _projectService: ProjectService,
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
    this.subscription = this._projectService.getAllProjects(params).subscribe(
      (projects) => {
        this.isLoading = false;
        this.projectData = projects;
        this.projectDataSource.data = this.projectData.data;
        console.log('Projects ',  this.projectDataSource.data);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = <any> error;
      }
    );
  }

  ngAfterViewInit() {
    this.projectDataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.projectDataSource.filter = filterValue.trim().toLowerCase();

    if (this.projectDataSource.paginator) {
      this.projectDataSource.paginator.firstPage();
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
      (project) => {
        this.isRequestLoading = false;
        this.getAllProjects();
        this._notificationService.showSuccessNotification('Deleted Successfully!', 'Project has been deleted.')
      },
      (error) => {
        this.isRequestLoading = false;
      }
    )
  }


}
