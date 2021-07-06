import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditSettingComponent } from './edit-setting/edit-setting.component';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  { path: '', component: EditSettingComponent },
  { path: 'edit-settings', component: EditSettingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
