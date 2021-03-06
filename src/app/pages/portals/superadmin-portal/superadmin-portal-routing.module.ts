import { SuperadminPortalComponent } from './superadmin-portal.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SuperadminPortalComponent,

    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'admin-dashboard',
      },
      {
        path: 'admin-dashboard',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'account-creation',
        loadChildren: () =>
          import('./pages/account-creation/account-creation.module').then(
            (m) => m.AccountCreationModule
          ),
      },
      {
        path: 'sla',
        loadChildren: () =>
          import('./pages/sla/sla.module').then((m) => m.SlaModule),
      },
      {
        path: 'clusters',
        loadChildren: () =>
          import('./pages/clusters/clusters.module').then(
            (m) => m.ClustersModule
          ),
      },
      {
        path: 'riders',
        loadChildren: () =>
          import('./pages/rider/rider.module').then((m) => m.RiderModule),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./pages/reports/reports.module').then((m) => m.ReportsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperadminPortalRoutingModule {}
