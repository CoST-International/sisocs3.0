import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from '../shared/guards/admin-guard/admin.guard';
import { DashboardComponent } from './dashboard.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {path: 'project', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule)},
      { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},
      { path: 'preparation', loadChildren: () => import('./preparation/preparation.module').then(m => m.PreparationModule) },
      { path: 'prequalification', loadChildren: () => import('./prequalification/prequalification.module').then(m => m.PrequalificationModule) },
      { path: 'acquisition', loadChildren: () => import('./acquisition/acquisition.module').then(m => m.AcquisitionModule) },
      { path: 'award', loadChildren: () => import('./award/award.module').then(m => m.AwardModule) },
      { path: 'hiring', loadChildren: () => import('./hiring/hiring.module').then(m => m.HiringModule) },
      { path: 'documents', loadChildren: () => import('./documents/documents.module').then(m => m.DocumentsModule) },
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
      { path: 'data-standard', loadChildren: () => import('./data-standard/data-standard.module').then(m => m.DataStandardModule) },
      { path: 'catalog', loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule) },
      { path: 'ending', loadChildren: () => import('./ending/ending.module').then(m => m.EndingModule) },
      {
        path: 'user-management',
        loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule),
        canLoad: [AdminGuard]
      },
      { path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
    ]
  },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
  { path: 'bidders', loadChildren: () => import('./catalog/bidder/bidder.module').then(m => m.BidderModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
