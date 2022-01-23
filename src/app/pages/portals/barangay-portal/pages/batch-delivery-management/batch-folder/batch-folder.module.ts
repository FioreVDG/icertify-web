import { ComponentModule } from './../../../../../../shared/components/component.module';
import { MaterialModule } from './../../../../../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchFolderRoutingModule } from './batch-folder-routing.module';
import { BatchFolderComponent } from './batch-folder.component';

@NgModule({
  declarations: [BatchFolderComponent],
  imports: [
    CommonModule,
    BatchFolderRoutingModule,
    MaterialModule,
    ComponentModule,
  ],
})
export class BatchFolderModule {}
