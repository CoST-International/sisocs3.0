import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubSectorsComponent } from './sub-sectors.component';

const routes: Routes = [{ path: '', component: SubSectorsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubSectorsRoutingModule { }
