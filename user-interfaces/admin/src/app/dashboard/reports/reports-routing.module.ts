import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcquisitionsComponent } from './acquisitions/acquisitions.component';
import { ReportsComponent } from './reports.component';
import { TechniciansComponent } from './technicians/technicians.component';

const routes: Routes = [
  { path: 'acquisitions', component: AcquisitionsComponent },
  { path: 'technicians', component: TechniciansComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
