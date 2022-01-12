import { DialogsModule } from './../../../shared/dialogs/dialogs.module';
import { ComponentModule } from './../../../shared/components/component.module';
import { MaterialModule } from './../../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminPortalRoutingModule } from './superadmin-portal-routing.module';
import { SuperadminPortalComponent } from './superadmin-portal.component';

@NgModule({
  declarations: [SuperadminPortalComponent],
  imports: [
    CommonModule,
    SuperadminPortalRoutingModule,
    MaterialModule,
    ComponentModule,
    DialogsModule,
  ],
})
export class SuperadminPortalModule {}
