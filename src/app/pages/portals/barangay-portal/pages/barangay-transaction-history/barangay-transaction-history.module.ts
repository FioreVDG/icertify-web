import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarangayTransactionHistoryRoutingModule } from './barangay-transaction-history-routing.module';
import { BarangayTransactionHistoryComponent } from './barangay-transaction-history.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { DialogsModule } from 'src/app/shared/dialogs/dialogs.module';

@NgModule({
  declarations: [BarangayTransactionHistoryComponent],
  imports: [
    CommonModule,
    BarangayTransactionHistoryRoutingModule,
    MaterialModule,
    ComponentModule,
    DialogsModule,
  ],
})
export class BarangayTransactionHistoryModule {}
