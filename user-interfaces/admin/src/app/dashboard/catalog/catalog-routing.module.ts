import { RouterModule, Routes } from '@angular/router';

import { CatalogComponent } from './catalog.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: CatalogComponent },
  { path: 'entities', loadChildren: () => import('./entities/entities.module').then(m => m.EntitiesModule) },
  { path: 'organization-units', loadChildren: () => import('./organization-units/organization-units.module').then(m => m.OrganizationUnitsModule) },
  { path: 'officials', loadChildren: () => import('./officials/officials.module').then(m => m.OfficialsModule) },
  { path: 'roles', loadChildren: () => import('./role/role.module').then(m => m.RoleModule) },
  { path: 'sectors', loadChildren: () => import('./sectors/sectors.module').then(m => m.SectorsModule) },
  { path: 'sub-sectors', loadChildren: () => import('./sub-sectors/sub-sectors.module').then(m => m.SubSectorsModule) },
  { path: 'financing-sources', loadChildren: () => import('./financing-source/financing-source.module').then(m => m.FinancingSourceModule) },
  { path: 'purposes', loadChildren: () => import('./purpose/purpose.module').then(m => m.PurposeModule) },
  { path: 'contract-types', loadChildren: () => import('./contract-type/contract-type.module').then(m => m.ContractTypeModule) },
  { path: 'bidders', loadChildren: () => import('./bidder/bidder.module').then(m => m.BidderModule) },
  { path: 'acquisition-methods', loadChildren: () => import('./acquisition-method/acquisition-method.module').then(m => m.AcquisitionMethodModule) },
  { path: 'hiring-methods', loadChildren: () => import('./hiring-method/hiring-method.module').then(m => m.HiringMethodModule) },
  { path: 'hiring-method-types', loadChildren: () => import('./hiring-method-type/hiring-method-type.module').then(m => m.HiringMethodTypeModule) },
  { path: 'contracts', loadChildren: () => import('./contracts/contracts.module').then(m => m.ContractsModule) },
  { path: 'guarantee-types', loadChildren: () => import('./guarantee-types/guarantee-types.module').then(m => m.GuaranteeTypesModule) },
  { path: 'currencies', loadChildren: () => import('./currency/currency.module').then(m => m.CurrencyModule) },
  { path: 'document-types', loadChildren: () => import('./document-types/document-types.module').then(m => m.DocumentTypesModule) },
  { path: 'organization-units', loadChildren: () => import('./organization-units/organization-units.module').then(m => m.OrganizationUnitsModule) },
  { path: 'contacts', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
