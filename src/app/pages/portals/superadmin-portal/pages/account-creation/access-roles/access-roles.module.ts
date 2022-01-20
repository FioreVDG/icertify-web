import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessRolesRoutingModule } from './access-roles-routing.module';
import { AccessRolesComponent } from './access-roles.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AccessRolesComponent],
  imports: [
    CommonModule,
    AccessRolesRoutingModule,
    MaterialModule,
    ComponentModule,
    ReactiveFormsModule,
  ],
})
export class AccessRolesModule {}
