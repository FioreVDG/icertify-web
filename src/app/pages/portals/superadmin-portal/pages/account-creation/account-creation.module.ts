import { MaterialModule } from './../../../../../shared/material/material.module';
import { ComponentModule } from './../../../../../shared/components/component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountCreationRoutingModule } from './account-creation-routing.module';
import { AccountCreationComponent } from './account-creation.component';

@NgModule({
  declarations: [AccountCreationComponent],
  imports: [
    CommonModule,
    AccountCreationRoutingModule,
    ComponentModule,
    MaterialModule,
  ],
})
export class AccountCreationModule {}
