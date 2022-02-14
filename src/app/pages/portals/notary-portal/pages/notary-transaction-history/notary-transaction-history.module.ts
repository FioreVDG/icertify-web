import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotaryTransactionHistoryRoutingModule } from './notary-transaction-history-routing.module';
import { NotaryTransactionHistoryComponent } from './notary-transaction-history.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { DialogsModule } from 'src/app/shared/dialogs/dialogs.module';

@NgModule({
  declarations: [NotaryTransactionHistoryComponent],
  imports: [
    CommonModule,
    NotaryTransactionHistoryRoutingModule,
    MaterialModule,
    ComponentModule,
    DialogsModule,
  ],
})
export class NotaryTransactionHistoryModule {}
