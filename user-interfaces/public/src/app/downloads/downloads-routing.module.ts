import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DownloadsPageComponent } from './downloads-page/downloads-page.component';

const routes: Routes = [
  {
    path: '',
    component: DownloadsPageComponent,
    // canActivate: [AngularFireAuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadsRoutingModule { }
