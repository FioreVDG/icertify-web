import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentReleasingToCourierComponent } from './document-releasing-to-courier.component';

const routes: Routes = [
  { path: '', component: DocumentReleasingToCourierComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentReleasingToCourierRoutingModule {}
