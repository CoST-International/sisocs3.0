import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqPageComponent } from './faq-page/faq-page.component';

const routes: Routes = [
  {
    path: '',
    component: FaqPageComponent,
    // canActivate: [AngularFireAuthGuard],
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqRoutingModule { }
