import { NotarizedDocumentReleasingComponent } from './notarized-document-releasing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: NotarizedDocumentReleasingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotarizedDocumentReleasingRoutingModule {}
