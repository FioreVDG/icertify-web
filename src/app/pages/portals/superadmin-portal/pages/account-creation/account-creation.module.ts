import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../../../../shared/material/material.module';
import { ComponentModule } from './../../../../../shared/components/component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountCreationRoutingModule } from './account-creation-routing.module';
import { AccountCreationComponent } from './account-creation.component';
import { SelectBarangayComponent } from './select-barangay/select-barangay.component';
import { ActionMenuComponent } from './action-menu/action-menu.component';

@NgModule({
  declarations: [AccountCreationComponent, SelectBarangayComponent, ActionMenuComponent],
  imports: [
    CommonModule,
    AccountCreationRoutingModule,
    ComponentModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class AccountCreationModule {}
