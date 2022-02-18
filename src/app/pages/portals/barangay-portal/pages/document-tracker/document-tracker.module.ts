import { DialogsModule } from './../../../../../shared/dialogs/dialogs.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentTrackerRoutingModule } from './document-tracker-routing.module';
import { DocumentTrackerComponent } from './document-tracker.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ComponentModule } from 'src/app/shared/components/component.module';

@NgModule({
  declarations: [DocumentTrackerComponent],
  imports: [
    CommonModule,
    DocumentTrackerRoutingModule,
    MaterialModule,
    ComponentModule,
    DialogsModule,
  ],
})
export class DocumentTrackerModule {}
