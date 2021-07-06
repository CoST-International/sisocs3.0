import { Component, OnInit } from '@angular/core';
import { OrganisationService } from '../../services/organisation.service';
import { ProjectService } from '../../services/project.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-downloads-page',
  templateUrl: './downloads-page.component.html',
  styleUrls: ['./downloads-page.component.scss']
})
export class DownloadsPageComponent implements OnInit {

  public projectOwners;
  baseUrl = environment.apiBaseUrl;
  years;
  year = (new Date()).getFullYear();
  isLoadingProjects = true;



  constructor(private projectService: ProjectService, private organizationService: OrganisationService) {}

  ngOnInit(): void {
    this.getProjectYears();
    this.getProjectOwners();
  }

  getProjectOwners() {
    this.isLoadingProjects = true;
    this.organizationService.getAll().subscribe(res => {
      this.isLoadingProjects = false;
      this.projectOwners = res.data;
      console.log(this.projectOwners);
    });
  }
  getProjectYears() {
    this.projectService.getProjectYears().subscribe(res => {
      this.years = res.data;
      console.log(this.years);
    });
  }

  onChange(e) {
   
    this.year = e.target.value;
    console.log(this.year);
  }

}
