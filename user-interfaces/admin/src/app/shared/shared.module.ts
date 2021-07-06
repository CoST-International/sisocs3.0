import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { DashboardLoaderComponent } from './loaders/dashboard-loader/dashboard-loader.component';
import { EncryptPipe } from './pipes/encrypt/encrypt.pipe';
import { ErrorNotifierComponent } from './error-notifier/error-notifier.component';
import { ListLoaderComponent } from './loaders/list-loader/list-loader.component';
import { MaterialModule } from './material/material.module';
import { NgxContentLoadingModule } from 'ngx-content-loading';
import { NotifierComponent } from './notifier/notifier.component';
import { NumbersOnlyDirective } from './directives/numbers/numbers-only.directive';

@NgModule({
  declarations: [
    DashboardLoaderComponent,
    ListLoaderComponent,
    EncryptPipe,
    NotifierComponent,
    ErrorNotifierComponent,
    NumbersOnlyDirective,
  ],
  imports: [
    CommonModule,
    NgxContentLoadingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    DashboardLoaderComponent,
    ListLoaderComponent,
    EncryptPipe
  ],
})
export class SharedModule { }
