import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
// import * as allProjects from '../../../data/allProjects.json';

@Component({
  selector: 'app-projects-by-sector',
  templateUrl: './projects-by-sector.component.html',
  styleUrls: ['./projects-by-sector.component.scss']
})
export class ProjectsBySectorComponent implements OnInit {


  projects;
  countProjects;
  sector;

  // dataToMigrate = allProjects;





  constructor(
    public projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sector = this.route.snapshot.queryParams.sector;
    // this.getProjectsBySector(this.sector);
    // this.getProjectCount();
    // this.addOc4idsProject(this.dataToMigrate);

    this.findBySector(this.sector);
  }


  searchProject(event: any) {
    let values = '';
    values += event.target.value;

    this.projectService.searchDocuments(values).subscribe(res => {
      console.log(res);
      this.projects = res;
    });
    console.log(values);
  }


  findBySector(sector) {
    this.projectService.getBySector(sector).subscribe(data => {
      this.projects = data;
      console.log(this.projects);
    });
  }

  getProjectCount() {
    this.projectService.getProjectCount().subscribe(data => {
      // this.countProjects = data[0];
    });
  }






}
