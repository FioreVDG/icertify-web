import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from './../../../../../shared/components/component.module';
import { MaterialModule } from './../../../../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClustersRoutingModule } from './clusters-routing.module';
import { ClustersComponent } from './clusters.component';
import { UpsertClusterComponent } from './upsert-cluster/upsert-cluster.component';

@NgModule({
  declarations: [ClustersComponent, UpsertClusterComponent],
  imports: [
    CommonModule,
    ClustersRoutingModule,
    MaterialModule,
    ComponentModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ClustersModule {}
