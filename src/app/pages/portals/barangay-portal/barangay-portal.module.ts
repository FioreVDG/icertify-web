import { clusterReducer } from './../../../store/cluster/cluster.reducer';
import { DialogsModule } from './../../../shared/dialogs/dialogs.module';
import { ComponentModule } from './../../../shared/components/component.module';
import { MaterialModule } from '../../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarangayPortalRoutingModule } from './barangay-portal-routing.module';
import { BarangayPortalComponent } from './barangay-portal.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from 'src/app/store/user/user.reducer';

@NgModule({
  declarations: [BarangayPortalComponent],
  imports: [
    CommonModule,
    BarangayPortalRoutingModule,
    MaterialModule,
    ComponentModule,
    DialogsModule,
    StoreModule.forFeature('user', userReducer),
    StoreModule.forFeature('cluster', clusterReducer),
  ],
})
export class BarangayPortalModule {}
