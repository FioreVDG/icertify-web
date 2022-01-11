import { ComponentModule } from '../../../shared/components/component.module';
import { MaterialModule } from '../../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminLoginRoutingModule } from './superadmin-login-routing.module';
import { SuperadminLoginComponent } from './superadmin-login.component';

@NgModule({
  declarations: [SuperadminLoginComponent],
  imports: [
    CommonModule,
    SuperadminLoginRoutingModule,
    MaterialModule,
    ComponentModule,
  ],
})
export class SuperadminLoginModule {}
