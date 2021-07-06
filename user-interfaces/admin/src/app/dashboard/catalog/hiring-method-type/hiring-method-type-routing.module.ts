import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HiringMethodTypeComponent } from './hiring-method-type.component';

const routes: Routes = [{ path: '', component: HiringMethodTypeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HiringMethodTypeRoutingModule { }
