import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainfooterComponent } from './mainfooter/mainfooter.component';


@NgModule({
  declarations: [MainfooterComponent],
  imports: [
    CommonModule
  ],
  exports: [MainfooterComponent]
})
export class FooterModule { }
