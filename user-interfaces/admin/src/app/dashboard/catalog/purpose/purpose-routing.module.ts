import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurposeComponent } from './purpose.component';

const routes: Routes = [{ path: '', component: PurposeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurposeRoutingModule { }
