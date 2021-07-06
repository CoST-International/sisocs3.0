import { millify } from 'millify';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ProjectService } from '../../services/project.service';
import { OrganisationService } from '../../services/organisation.service';
import { AwardsService } from '../../services/awards.service';
import { CompletionsService } from '../../services/completions.service';
import { ProjectStatusService } from '../../services/project-status.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute } from '@angular/router';
import { SectorService } from '../../services/sector.service';
import { HotToastService } from '@ngneat/hot-toast';




@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  states;
  projects;
  organisations;
  countAwards;
  countProjects;
  // countCompletions = countCompletions;
  statuses;
  allProjects;
  totalAwards;
  totalValue;
  totalProjects;
  totalBudget;
  baseUrl = environment.apiBaseUrl;
  projectsSum;
  sectorId;
  sectors;
  isLoadingProjects = true;
  isLoadingSectors = true;
  isLoadingOrg = true;
  isLoadingAwards = true;
  isLoadingProjCount = true;
  isLoadingProjVal = true;
  chartTitle = 'Disclosure by year';
  series = [
    {
      name: 'My-series',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }
  ];
  pieseries = [10, 41, 35, 51, 49, 62, 69, 91, 148];
  series2 = [
    {
      name: 'Net Profit',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    },
    {
      name: 'Revenue',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    },
    {
      name: 'Free Cash Flow',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    }
  ];
  categories = ['Jan', 'Feb',  'Mar',  'Apr',  'May',  'Jun',  'Jul',  'Aug', 'Sep'];
  pieCategories = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'];






  constructor(

    public stateService: StateService,
    public projectService: ProjectService,
    public organisationService: OrganisationService,
    public awardsService: AwardsService,
    public completionsService: CompletionsService,
    public statusService: ProjectStatusService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private sectorService: SectorService,
    private toastService: HotToastService
  ) {

    this.sectorId = this.route.snapshot.queryParams.s;



  }

  ngOnInit(): void {

    // this.getStates();
    if (this.sectorId) {
      this.getProjectBySector(this.sectorId);
    } else {
      this.getProjects();
    }

    this.countOrganisations();
    this.getProjectsCount();
    this.getAwardsCount();
    this.getProjectsSum();
    this.getSectors();

  }
  ngAfterContentInit(): void {
    // Called after ngOnInit when the component's or directive's content has been initialized.
    // Add 'implements AfterContentInit' to the class.
  }




  getSectors() {
    this.isLoadingSectors = true;
    this.sectorService.getAll().subscribe(res => {
      this.sectors = res.data;
      this.isLoadingSectors = false;
    });
  }

  searchProject(event: any) {
    let values = '';
    values += event.target.value;
    this.isLoadingProjects = true;
    this.projectService.searchDocuments(values).subscribe(res => {
      this.projects = res.projects;
      this.isLoadingProjects = false;
    });
  }






  getStatuses() {
    this.stateService.getAll().subscribe(data => {
      this.statuses = data;
    });
  }

  getStates() {
    this.stateService.getAll().subscribe(data => {
      this.states = data;
    });
  }

  countOrganisations() {
    this.isLoadingOrg = true;
    this.organisationService.getCount().subscribe(res => {
      this.organisations = res.data;
      this.isLoadingOrg = false;
    });
  }

  getProjects() {

    this.projectService.getAll()
      .pipe(
        this.toastService.observe({
          loading: 'Loading Projects...',
          success: '🚀 Projects loaded successfully',
          error: '😡 Projects could not be loaded'
        })
      )
      .subscribe(res => {
        this.projects = res.projects;
        this.isLoadingProjects = false;

      });
  }

  getProjectBySector(s) {
    this.isLoadingProjects = true;
    this.projectService.getBySector(s).subscribe(res => {
      this.projects = res.projects;
      this.isLoadingProjects = false;

    });
  }

  getProjectsCount() {
    this.isLoadingProjCount = true;
    this.projectService.getProjectCount().subscribe(res => {
      this.countProjects = res.data;
      this.isLoadingProjCount = false;
    });
  }

  getAwardsCount() {
    this.isLoadingAwards = true;
    this.awardsService.getAwardCount().subscribe(res => {
      this.countAwards = res.data;
      this.isLoadingAwards = false;
    });
  }

  getProjectsSum() {
    this.isLoadingProjVal = true;
    this.projectService.getProjectsSum().subscribe(res => {
      this.projectsSum = res.data[0].totalBudget;
      this.isLoadingProjVal = false;
    });
  }

  milifyValue(labelValue) {

    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

      ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + 'B'
      // Six Zeroes for Millions
      : Math.abs(Number(labelValue)) >= 1.0e+6

        ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + 'M'
        // Three Zeroes for Thousands
        : Math.abs(Number(labelValue)) >= 1.0e+3

          ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + 'K'

          : Math.abs(Number(labelValue));

  }










}
