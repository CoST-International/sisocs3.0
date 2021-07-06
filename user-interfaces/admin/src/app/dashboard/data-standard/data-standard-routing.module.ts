import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataStandardComponent } from './data-standard.component';

const routes: Routes = [{ path: '', component: DataStandardComponent }, { path: 'sectors', loadChildren: () => import('./state/state.module').then(m => m.StateModule) }, { path: 'sectors', loadChildren: () => import('./sectors/sectors.module').then(m => m.SectorsModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataStandardRoutingModule { }
