import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadingNotarizedDocumentRoutingModule } from './uploading-notarized-document-routing.module';
import { UploadingNotarizedDocumentComponent } from './uploading-notarized-document.component';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { UploadNotirizedDocumentComponent } from './upload-notirized-document/upload-notirized-document.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@NgModule({
  declarations: [
    UploadingNotarizedDocumentComponent,
    UploadNotirizedDocumentComponent,
  ],
  imports: [
    CommonModule,
    UploadingNotarizedDocumentRoutingModule,
    ComponentModule,
    MaterialModule,
    NgxDocViewerModule,
  ],
})
export class UploadingNotarizedDocumentModule {}
