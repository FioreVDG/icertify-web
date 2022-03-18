import { MaterialModule } from './../../../shared/material/material.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotaryPortalRoutingModule } from './notary-portal-routing.module';
import { NotaryPortalComponent } from './notary-portal.component';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { StoreModule } from '@ngrx/store';
import { userReducer } from 'src/app/store/user/user.reducer';
import { ReportsComponent } from './pages/reports/reports.component';
import { clusterReducer } from 'src/app/store/cluster/cluster.reducer';

@NgModule({
  declarations: [NotaryPortalComponent],
  imports: [
    CommonModule,
    NotaryPortalRoutingModule,
    MaterialModule,
    ComponentModule,
    StoreModule.forFeature('user', userReducer),
    StoreModule.forFeature('cluster', clusterReducer),
  ],
})
export class NotaryPortalModule {}
