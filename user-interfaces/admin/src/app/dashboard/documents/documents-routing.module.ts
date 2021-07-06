import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsListComponent } from './documents-list/documents-list.component';
import { DocumentsComponent } from './documents.component';
import { EditDocumentComponent } from './edit-document/edit-document.component';
import { NewDocumentComponent } from './new-document/new-document.component';

const routes: Routes = [
  { path: '', component: DocumentsListComponent },
  { path: 'documents-list', component: DocumentsListComponent },
  { path: 'new-document', component: NewDocumentComponent },
  { path: 'edit-document/:id', component: EditDocumentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }
