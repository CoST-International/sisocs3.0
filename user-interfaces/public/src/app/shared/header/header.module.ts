import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainnavComponent } from './mainnav/mainnav.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [MainnavComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [MainnavComponent]
})
export class HeaderModule { }
