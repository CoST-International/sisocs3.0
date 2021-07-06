import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { HeaderModule } from '../shared/header/header.module';
import { FooterModule } from '../shared/footer/footer.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ContactPageComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    HeaderModule,
    FooterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ContactModule { }
