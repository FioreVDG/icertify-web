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
        path: 'registrant-db',
        loadChildren: () =>
          import('./pages/registrants-db/registrants-db.module').then(
            (m) => m.RegistrantsDbModule
          ),
      },
      {
        path: 'new-transaction',
        loadChildren: () =>
          import('./pages/new-transaction/new-transaction.module').then(
            (m) => m.NewTransactionModule
          ),
      },
      {
        path: 'document-receiving',
        loadChildren: () =>
          import('./pages/document-receiving/document-receiving.module').then(
            (m) => m.DocumentReceivingModule
          ),
      },
      {
        path: 'batch-delivery-management',
        loadChildren: () =>
          import(
            './pages/batch-delivery-management/batch-delivery-management.module'
          ).then((m) => m.BatchDeliveryManagementModule),
      },
      {
        path: 'video-conference',
        loadChildren: () =>
          import(
            './pages/barangay-video-conferencing/barangay-video-conferencing.module'
          ).then((m) => m.BarangayVideoConferencingModule),
      },
      {
        path: 'notarized-document-receiving',
        loadChildren: () =>
          import(
            './pages/notarized-document-receiving/notarized-document-receiving.module'
          ).then((m) => m.NotarizedDocumentReceivingModule),
      },
      {
        path: 'notarized-document-releasing',
        loadChildren: () =>
          import(
            './pages/notarized-document-releasing/notarized-document-releasing.module'
          ).then((m) => m.NotarizedDocumentReleasingModule),
      },
      {
        path: 'transaction-history',
        loadChildren: () =>
          import(
            './pages/barangay-transaction-history/barangay-transaction-history.module'
          ).then((m) => m.BarangayTransactionHistoryModule),
      },
      {
        path: 'document-tracker',
        loadChildren: () =>
          import('./pages/document-tracker/document-tracker.module').then(
            (m) => m.DocumentTrackerModule
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
