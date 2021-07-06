import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentTypesRoutingModule } from './document-types-routing.module';
import { DocumentTypesComponent } from './document-types.component';


@NgModule({
  declarations: [
    DocumentTypesComponent
  ],
  imports: [
    CommonModule,
    DocumentTypesRoutingModule
  ]
})
export class DocumentTypesModule { }
