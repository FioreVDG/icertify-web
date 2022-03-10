import { DialogsModule } from './../../../../../shared/dialogs/dialogs.module';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrantsDbRoutingModule } from './registrants-db-routing.module';
import { RegistrantsDbComponent } from './registrants-db.component';
import { UploadCertOfIndigencyComponent } from './upload-cert-of-indigency/upload-cert-of-indigency.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@NgModule({
  declarations: [RegistrantsDbComponent, UploadCertOfIndigencyComponent],
  imports: [
    CommonModule,
    RegistrantsDbRoutingModule,
    MaterialModule,
    ComponentModule,
    DialogsModule,
    NgxDocViewerModule,
  ],
})
export class RegistrantsDbModule {}
