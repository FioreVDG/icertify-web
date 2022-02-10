import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from './../../../../../shared/components/component.module';
import { MaterialModule } from './../../../../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClustersRoutingModule } from './clusters-routing.module';
import { ClustersComponent } from './clusters.component';
import { UpsertClusterComponent } from './upsert-cluster/upsert-cluster.component';
import { AutocompleteDialogComponent } from './upsert-cluster/autocomplete-dialog/autocomplete-dialog.component';

@NgModule({
  declarations: [ClustersComponent, UpsertClusterComponent, AutocompleteDialogComponent],
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
