import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentReceivingRoutingModule } from './document-receiving-routing.module';
import { DocumentReceivingComponent } from './document-receiving.component';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ViewTransactionComponent } from './view-transaction/view-transaction.component';

@NgModule({
  declarations: [DocumentReceivingComponent, ViewTransactionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    DocumentReceivingRoutingModule,
    ComponentModule,
  ],
})
export class DocumentReceivingModule {}
