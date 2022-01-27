import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentReleasingToCourierRoutingModule } from './document-releasing-to-courier-routing.module';
import { DocumentReleasingToCourierComponent } from './document-releasing-to-courier.component';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [DocumentReleasingToCourierComponent],
  imports: [
    CommonModule,
    DocumentReleasingToCourierRoutingModule,
    ComponentModule,
    MaterialModule,
  ],
})
export class DocumentReleasingToCourierModule {}
