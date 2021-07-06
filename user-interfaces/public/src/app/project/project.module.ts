import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { DetailsComponent } from './details/details.component';
import { HeaderModule } from '../shared/header/header.module';
import { FooterModule } from '../shared/footer/footer.module';
import { ProjectsBySectorComponent } from './projects-by-sector/projects-by-sector.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment.prod';
import { SpinnerModule } from '../shared/spinner/spinner.module';


@NgModule({
  declarations: [DetailsComponent, ProjectsBySectorComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    HeaderModule,
    FooterModule,
    SpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapsApiKey
    })
  ]
})
export class ProjectModule { }
