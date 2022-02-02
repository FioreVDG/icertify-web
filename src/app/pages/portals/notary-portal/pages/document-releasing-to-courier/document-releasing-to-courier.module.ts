import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentReleasingToCourierRoutingModule } from './document-releasing-to-courier-routing.module';
import { DocumentReleasingToCourierComponent } from './document-releasing-to-courier.component';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { MarkAsEnrouteComponent } from './mark-as-enroute/mark-as-enroute.component';

@NgModule({
  declarations: [DocumentReleasingToCourierComponent, MarkAsEnrouteComponent],
  imports: [
    CommonModule,
    DocumentReleasingToCourierRoutingModule,
    ComponentModule,
    MaterialModule,
  ],
})
export class DocumentReleasingToCourierModule {}
