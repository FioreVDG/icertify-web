import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentReceivingComponent } from './document-receiving.component';

const routes: Routes = [{ path: '', component: DocumentReceivingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentReceivingRoutingModule {}
