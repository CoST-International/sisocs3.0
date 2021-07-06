import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BidderRoutingModule } from './bidder-routing.module';
import { BidderComponent } from './bidder.component';
import { NewBidderComponent } from './new-bidder/new-bidder.component';
import { EditBidderComponent } from './edit-bidder/edit-bidder.component';
import { BiddersListComponent } from './bidders-list/bidders-list.component';


@NgModule({
  declarations: [
    BidderComponent,
    NewBidderComponent,
    EditBidderComponent,
    BiddersListComponent
  ],
  imports: [
    CommonModule,
    BidderRoutingModule
  ]
})
export class BidderModule { }
