import { UploadingNotarizedDocumentComponent } from './uploading-notarized-document.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: UploadingNotarizedDocumentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadingNotarizedDocumentRoutingModule {}
