import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadingNotarizedDocumentRoutingModule } from './uploading-notarized-document-routing.module';
import { UploadingNotarizedDocumentComponent } from './uploading-notarized-document.component';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [UploadingNotarizedDocumentComponent],
  imports: [
    CommonModule,
    UploadingNotarizedDocumentRoutingModule,
    ComponentModule,
    MaterialModule,
  ],
})
export class UploadingNotarizedDocumentModule {}
