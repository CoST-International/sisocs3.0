import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectorsRoutingModule } from './sectors-routing.module';
import { SectorsComponent } from './sectors.component';
import { SectorListComponent } from './sector-list/sector-list.component';
import { NewSectorComponent } from './new-sector/new-sector.component';
import { EditSectorComponent } from './edit-sector/edit-sector.component';


@NgModule({
  declarations: [
    SectorsComponent,
    SectorListComponent,
    NewSectorComponent,
    EditSectorComponent
  ],
  imports: [
    CommonModule,
    SectorsRoutingModule
  ]
})
export class SectorsModule { }
