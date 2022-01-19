import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarangayPortalComponent } from './barangay-portal.component';

const routes: Routes = [
  {
    path: '',
    component: BarangayPortalComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'barangay-dashboard',
      },
      {
        path: 'barangay-dashboard',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'registration',
        loadChildren: () =>
          import('./pages/registration/registration.module').then(
            (m) => m.RegistrationModule
          ),
      },
      {
        path: 'new-transaction',
        loadChildren: () =>
          import('./pages/new-transaction/new-transaction.module').then(
            (m) => m.NewTransactionModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarangayPortalRoutingModule {}
