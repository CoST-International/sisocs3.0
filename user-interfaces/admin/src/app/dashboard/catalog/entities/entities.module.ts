import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { EditEntityComponent } from './edit-entity/edit-entity.component';
import { EntitiesComponent } from './entities.component';
import { EntitiesRoutingModule } from './entities-routing.module';
import { EntityListComponent } from './entity-list/entity-list.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NewEntityComponent } from './new-entity/new-entity.component';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    EntitiesComponent,
    EntityListComponent,
    EditEntityComponent,
    NewEntityComponent
  ],
  imports: [
    CommonModule,
    EntitiesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class EntitiesModule { }
