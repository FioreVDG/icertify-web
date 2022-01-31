import { DialogsModule } from './../../../../../shared/dialogs/dialogs.module';
import { ComponentModule } from './../../../../../shared/components/component.module';
import { MaterialModule } from './../../../../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarangayVideoConferencingRoutingModule } from './barangay-video-conferencing-routing.module';
import { BarangayVideoConferencingComponent } from './barangay-video-conferencing.component';

@NgModule({
  declarations: [BarangayVideoConferencingComponent],
  imports: [
    CommonModule,
    BarangayVideoConferencingRoutingModule,
    MaterialModule,
    ComponentModule,
    DialogsModule,
  ],
})
export class BarangayVideoConferencingModule {}
