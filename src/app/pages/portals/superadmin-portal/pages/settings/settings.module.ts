import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { ServiceLevelAgreementComponent } from './service-level-agreement/service-level-agreement.component';
import { VideoConferenceDurationComponent } from './video-conference-duration/video-conference-duration.component';
import { NumOfDocToBeBatchedComponent } from './num-of-doc-to-be-batched/num-of-doc-to-be-batched.component';
import { AddClusterComponent } from './assigning-cluster-to-notary/add-cluster/add-cluster.component';
import { AssigningBarangayToRiderComponent } from './assigning-barangay-to-rider/assigning-barangay-to-rider.component';
import { AssigningClusterToNotaryComponent } from './assigning-cluster-to-notary/assigning-cluster-to-notary.component';
import { AddRiderComponent } from './assigning-barangay-to-rider/add-rider/add-rider.component';

@NgModule({
  declarations: [
    SettingsComponent,
    ServiceLevelAgreementComponent,
    VideoConferenceDurationComponent,
    NumOfDocToBeBatchedComponent,
    AddClusterComponent,
    AssigningBarangayToRiderComponent,
    AssigningClusterToNotaryComponent,
    AddRiderComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MaterialModule,
    ComponentModule,
  ],
})
export class SettingsModule {}
