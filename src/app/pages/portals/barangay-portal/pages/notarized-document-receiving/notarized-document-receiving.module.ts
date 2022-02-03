import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotarizedDocumentReceivingRoutingModule } from './notarized-document-receiving-routing.module';
import { NotarizedDocumentReceivingComponent } from './notarized-document-receiving.component';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ViewFolderTransactionsComponent } from './view-folder-transactions/view-folder-transactions.component';

@NgModule({
  declarations: [NotarizedDocumentReceivingComponent, ViewFolderTransactionsComponent],
  imports: [
    CommonModule,
    NotarizedDocumentReceivingRoutingModule,
    ComponentModule,
    MaterialModule,
  ],
})
export class NotarizedDocumentReceivingModule {}
