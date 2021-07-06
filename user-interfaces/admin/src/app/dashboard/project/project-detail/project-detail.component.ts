import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProject, IProjectAttributes, IProjectData } from '../../../shared/interfaces/project/IProject';
import { Observable, Subscription, of } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { DecryptService } from 'src/app/shared/services/decrypt/decrypt.service';
import { ProjectService } from '../_services/project.service';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const apiUrl = environment.baseUrl;

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {

  isLoading: Boolean = false;
  isRequestLoading: Boolean = false;
  errorMessage: string = '';

  subscription: Subscription;
  projectId!: number | string;
  project!: IProjectAttributes;

  constructor(
    private route: ActivatedRoute,
    public _authService: AuthService,
    private _projectService: ProjectService,
    private _decryptService: DecryptService,
  ) {
    this.subscription = this.route.params.subscribe((params) => {
      this.projectId = this._decryptService.decrypt(params['id']);
    });

    this.getProject(this.projectId);
   }

  ngOnInit(): void {
  }

  getProject(id: number | string) {
    this.isRequestLoading = true;
    this.subscription = this._projectService.getProjectById(id).subscribe(
      (project) => {
        this.isRequestLoading = false;
        this.project = project.data;
      },
      (error) => {
        this.isRequestLoading = false;
      }
    )
  }

  downloadDocument(url: string) {
    window.open(`${apiUrl}${url}`, '_blank');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
