import { DialogsModule } from './../../../../../shared/dialogs/dialogs.module';
import { ComponentModule } from './../../../../../shared/components/component.module';
import { MaterialModule } from './../../../../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarangayVideoConferencingRoutingModule } from './barangay-video-conferencing-routing.module';
import { BarangayVideoConferencingComponent } from './barangay-video-conferencing.component';
import { ViewBatchTransactionsComponent } from './view-batch-transactions/view-batch-transactions.component';
import { BrgyRoomComponent } from './brgy-room/brgy-room.component';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
  declarations: [
    BarangayVideoConferencingComponent,
    ViewBatchTransactionsComponent,
    BrgyRoomComponent,
  ],
  imports: [
    CommonModule,
    BarangayVideoConferencingRoutingModule,
    MaterialModule,
    ComponentModule,
    DialogsModule,
    WebcamModule,
  ],
})
export class BarangayVideoConferencingModule {}
