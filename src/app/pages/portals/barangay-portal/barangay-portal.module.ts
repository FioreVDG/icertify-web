import { DialogsModule } from './../../../shared/dialogs/dialogs.module';
import { ComponentModule } from './../../../shared/components/component.module';
import { MaterialModule } from '../../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarangayPortalRoutingModule } from './barangay-portal-routing.module';
import { BarangayPortalComponent } from './barangay-portal.component';

@NgModule({
  declarations: [BarangayPortalComponent],
  imports: [
    CommonModule,
    BarangayPortalRoutingModule,
    MaterialModule,
    ComponentModule,
    DialogsModule,
  ],
})
export class BarangayPortalModule {}
