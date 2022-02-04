import { NotarizedDocumentReceivingComponent } from './notarized-document-receiving.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: NotarizedDocumentReceivingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotarizedDocumentReceivingRoutingModule {}
