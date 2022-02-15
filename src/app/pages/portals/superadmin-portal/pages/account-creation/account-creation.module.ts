import { UpsertNotarialCommissionComponent } from './notarial-table/upsert-notarial-commission/upsert-notarial-commission.component';
import { DialogsModule } from './../../../../../shared/dialogs/dialogs.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../../../../shared/material/material.module';
import { ComponentModule } from './../../../../../shared/components/component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountCreationRoutingModule } from './account-creation-routing.module';
import { AccountCreationComponent } from './account-creation.component';
import { SelectBarangayComponent } from './select-barangay/select-barangay.component';
import { ActionMenuComponent } from './action-menu/action-menu.component';
import { UpsertAccountsComponent } from './upsert-accounts/upsert-accounts.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { UserFormComponent } from './users-table/user-form/user-form.component';
import { AccessRoleTableComponent } from './access-role-table/access-role-table.component';
import { AccessRoleFormComponent } from './access-role-table/access-role-form/access-role-form.component';
import { NotarialTableComponent } from './notarial-table/notarial-table.component';

@NgModule({
  declarations: [
    AccountCreationComponent,
    SelectBarangayComponent,
    ActionMenuComponent,
    UpsertAccountsComponent,
    UsersTableComponent,
    UserFormComponent,
    AccessRoleTableComponent,
    AccessRoleFormComponent,
    NotarialTableComponent,
    UpsertNotarialCommissionComponent,
  ],
  imports: [
    CommonModule,
    AccountCreationRoutingModule,
    ComponentModule,
    MaterialModule,
    ReactiveFormsModule,
    DialogsModule,
    FormsModule,
  ],
})
export class AccountCreationModule {}
