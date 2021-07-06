import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BidderComponent } from './bidder.component';

const routes: Routes = [{ path: '', component: BidderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BidderRoutingModule { }
