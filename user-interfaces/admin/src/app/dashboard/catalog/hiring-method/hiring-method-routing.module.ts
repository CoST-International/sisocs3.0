import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HiringMethodComponent } from './hiring-method.component';

const routes: Routes = [{ path: '', component: HiringMethodComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HiringMethodRoutingModule { }
