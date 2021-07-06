import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { ProjectsBySectorComponent } from './projects-by-sector/projects-by-sector.component';

const routes: Routes = [
  {
    path: 'details',
    component: DetailsComponent,
    // canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'sector',
    component: ProjectsBySectorComponent,
    // canActivate: [AngularFireAuthGuard],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
