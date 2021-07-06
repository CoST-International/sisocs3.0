import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancingSourceComponent } from './financing-source.component';

const routes: Routes = [{ path: '', component: FinancingSourceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancingSourceRoutingModule { }
