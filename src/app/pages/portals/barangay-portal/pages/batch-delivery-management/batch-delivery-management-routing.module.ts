import { BatchDeliveryManagementComponent } from './batch-delivery-management.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BatchDeliveryManagementComponent,
    children: [
      {
        path: 'batch-folder/:id',
        loadChildren: () =>
          import('./batch-folder/batch-folder.module').then(
            (m) => m.BatchFolderModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BatchDeliveryManagementRoutingModule {}
