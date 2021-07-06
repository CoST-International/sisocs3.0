import { HotToastModule } from '@ngneat/hot-toast';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderModule } from '../shared/header/header.module';
import { FooterModule } from '../shared/footer/footer.module';
import { NumberSuffixPipe } from '../number-suffix.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerModule } from '../shared/spinner/spinner.module';
import { ChartModule } from '../shared/modules/chart/chart.module';


@NgModule({
  declarations: [LandingPageComponent, NumberSuffixPipe],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HeaderModule,
    FooterModule,
    SpinnerModule,
    NgxSpinnerModule,
    HttpClientModule,
    HotToastModule.forRoot(),
    ChartModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})

export class HomeModule { }
