import { NotaryPortalComponent } from './notary-portal.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: NotaryPortalComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'notary-dashboard',
      },
      {
        path: 'notary-dashboard',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'document-receiving',
        loadChildren: () =>
          import('./pages/document-receiving/document-receiving.module').then(
            (m) => m.DocumentReceivingModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotaryPortalRoutingModule {}
