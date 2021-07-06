import { HeaderModule } from './../shared/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadsRoutingModule } from './downloads-routing.module';
import { DownloadsPageComponent } from './downloads-page/downloads-page.component';
import { FooterModule } from '../shared/footer/footer.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerModule } from '../shared/spinner/spinner.module';


@NgModule({
  declarations: [DownloadsPageComponent],
  imports: [
    CommonModule,
    DownloadsRoutingModule,
    HeaderModule,
    FooterModule,
    NgxSpinnerModule,
    SpinnerModule,
  ]
})
export class DownloadsModule { }
