import { ReportsModule } from './pages/reports/reports.module';
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
      {
        path: 'video-conference',
        loadChildren: () =>
          import('./pages/video-conferencing/video-conferencing.module').then(
            (m) => m.VideoConferencingModule
          ),
      },
      {
        path: 'document-releasing-to-courier',
        loadChildren: () =>
          import(
            './pages/document-releasing-to-courier/document-releasing-to-courier.module'
          ).then((m) => m.DocumentReleasingToCourierModule),
      },
      {
        path: 'uploading-notarized-document',
        loadChildren: () =>
          import(
            './pages/uploading-notarized-document/uploading-notarized-document.module'
          ).then((m) => m.UploadingNotarizedDocumentModule),
      },
      {
        path: 'transaction-history',
        loadChildren: () =>
          import(
            './pages/notary-transaction-history/notary-transaction-history.module'
          ).then((m) => m.NotaryTransactionHistoryModule),
      },
      {
        path: 'document-tracker',
        loadChildren: () =>
          import(
            './pages/notary-document-tracker/notary-document-tracker.module'
          ).then((m) => m.NotaryDocumentTrackerModule),
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
export class NotaryPortalRoutingModule {}
