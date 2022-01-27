import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPortalRoutingModule } from './user-portal-routing.module';
import { UserPortalComponent } from './user-portal.component';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [UserPortalComponent],
  imports: [
    CommonModule,
    ComponentModule,
    UserPortalRoutingModule,
    MaterialModule,
  ],
})
export class UserPortalModule {}
