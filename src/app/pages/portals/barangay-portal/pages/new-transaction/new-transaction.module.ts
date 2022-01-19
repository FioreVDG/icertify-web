import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from './../../../../../shared/components/component.module';
import { DialogsModule } from './../../../../../shared/dialogs/dialogs.module';
import { MaterialModule } from './../../../../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewTransactionRoutingModule } from './new-transaction-routing.module';
import { NewTransactionComponent } from './new-transaction.component';

@NgModule({
  declarations: [NewTransactionComponent],
  imports: [
    CommonModule,
    NewTransactionRoutingModule,
    MaterialModule,
    DialogsModule,
    ComponentModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class NewTransactionModule {}
