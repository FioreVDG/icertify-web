import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessRolesRoutingModule } from './access-roles-routing.module';
import { AccessRolesComponent } from './access-roles.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccessRoleDialogFormComponent } from './access-role-dialog-form/access-role-dialog-form.component';

@NgModule({
  declarations: [AccessRolesComponent, AccessRoleDialogFormComponent],
  imports: [
    CommonModule,
    AccessRolesRoutingModule,
    MaterialModule,
    ComponentModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AccessRolesModule {}
