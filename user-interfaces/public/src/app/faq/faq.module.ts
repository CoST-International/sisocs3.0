import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { HeaderModule } from '../shared/header/header.module';
import { FooterModule } from '../shared/footer/footer.module';

@NgModule({
  declarations: [FaqPageComponent],
  imports: [
    CommonModule,
    FaqRoutingModule,
    HeaderModule,
    FooterModule,
  ]
})
export class FaqModule { }

