import { BatchFolderComponent } from './batch-folder/batch-folder.component';
import { MaterialModule } from './../../../../../shared/material/material.module';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchDeliveryManagementRoutingModule } from './batch-delivery-management-routing.module';
import { BatchDeliveryManagementComponent } from './batch-delivery-management.component';
import { MarkAsEnrouteComponent } from './mark-as-enroute/mark-as-enroute.component';

@NgModule({
  declarations: [BatchDeliveryManagementComponent, MarkAsEnrouteComponent],
  imports: [
    CommonModule,
    BatchDeliveryManagementRoutingModule,
    ComponentModule,
    MaterialModule,
  ],
})
export class BatchDeliveryManagementModule {}
