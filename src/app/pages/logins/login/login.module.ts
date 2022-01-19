import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogsModule } from './../../../shared/dialogs/dialogs.module';
import { MaterialModule } from './../../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    DialogsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LoginModule {}
