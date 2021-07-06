import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcquisitionMethodComponent } from './acquisition-method.component';

const routes: Routes = [{ path: '', component: AcquisitionMethodComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcquisitionMethodRoutingModule { }
