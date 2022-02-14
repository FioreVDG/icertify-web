import { DialogsModule } from './../../../../../shared/dialogs/dialogs.module';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { MaterialModule } from './../../../../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotaryDocumentTrackerRoutingModule } from './notary-document-tracker-routing.module';
import { NotaryDocumentTrackerComponent } from './notary-document-tracker.component';

@NgModule({
  declarations: [NotaryDocumentTrackerComponent],
  imports: [
    CommonModule,
    NotaryDocumentTrackerRoutingModule,
    MaterialModule,
    ComponentModule,
    DialogsModule,
  ],
})
export class NotaryDocumentTrackerModule {}
