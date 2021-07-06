import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  panelOpenState = false;
  phase = 'identification';
  id = '';
  project;
  lat;
  lon;
  baseUrl = environment.apiBaseUrl;
  isLoadingProjects = true;


  constructor(private route: ActivatedRoute, private projectService: ProjectService) {
    this.id = this.route.snapshot.queryParams.id;
   }

  ngOnInit(): void {
    this.getProject(this.id);
  }

  currentPhase(phase: any) {
    this.phase = phase;

  }

  getProject(id) {
    this.projectService.getProject(id).subscribe(res => {
      this.project = res.projects[0];
      this.isLoadingProjects = false;
      console.log(this.project);

      this.lat = Number(this.project.locations[0].geometry.coordinates[0]);
      this.lon = Number(this.project.locations[0].geometry.coordinates[1]);

    });


}

}
