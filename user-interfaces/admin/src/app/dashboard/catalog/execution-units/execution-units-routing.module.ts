import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExecutionUnitsComponent } from './execution-units.component';

const routes: Routes = [{ path: '', component: ExecutionUnitsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExecutionUnitsRoutingModule { }
