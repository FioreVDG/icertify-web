import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogsModule } from './../../../../../shared/dialogs/dialogs.module';
import { ComponentModule } from './../../../../../shared/components/component.module';
import { MaterialModule } from './../../../../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';

@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    MaterialModule,
    ComponentModule,
    DialogsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class RegistrationModule {}
