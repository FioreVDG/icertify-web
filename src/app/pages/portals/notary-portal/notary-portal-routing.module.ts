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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotaryPortalRoutingModule {}
