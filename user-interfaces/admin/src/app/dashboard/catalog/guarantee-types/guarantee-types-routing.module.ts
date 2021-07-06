import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuaranteeTypesComponent } from './guarantee-types.component';

const routes: Routes = [{ path: '', component: GuaranteeTypesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuaranteeTypesRoutingModule { }
