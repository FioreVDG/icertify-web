import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotarizedDocumentReleasingRoutingModule } from './notarized-document-releasing-routing.module';
import { NotarizedDocumentReleasingComponent } from './notarized-document-releasing.component';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [NotarizedDocumentReleasingComponent],
  imports: [
    CommonModule,
    NotarizedDocumentReleasingRoutingModule,
    ComponentModule,
    MaterialModule,
  ],
})
export class NotarizedDocumentReleasingModule {}
