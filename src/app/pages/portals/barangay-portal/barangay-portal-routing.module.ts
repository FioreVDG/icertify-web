import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarangayPortalComponent } from './barangay-portal.component';

const routes: Routes = [
  {
    path: '',
    component: BarangayPortalComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarangayPortalRoutingModule {}
