import { ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { MaterialModule } from './../../../../../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserDialogFormComponent } from './user-dialog-form/user-dialog-form.component';

@NgModule({
  declarations: [UsersComponent, UserDialogFormComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    ComponentModule,
    ReactiveFormsModule,
  ],
})
export class UsersModule {}
