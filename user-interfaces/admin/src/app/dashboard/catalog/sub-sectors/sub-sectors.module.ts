import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubSectorsRoutingModule } from './sub-sectors-routing.module';
import { SubSectorsComponent } from './sub-sectors.component';


@NgModule({
  declarations: [
    SubSectorsComponent
  ],
  imports: [
    CommonModule,
    SubSectorsRoutingModule
  ]
})
export class SubSectorsModule { }
