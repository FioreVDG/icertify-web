import { DialogsModule } from './../../../shared/dialogs/dialogs.module';
import { ComponentModule } from './../../../shared/components/component.module';
import { MaterialModule } from './../../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminPortalRoutingModule } from './superadmin-portal-routing.module';
import { SuperadminPortalComponent } from './superadmin-portal.component';
import { userReducer } from 'src/app/store/user/user.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [SuperadminPortalComponent],
  imports: [
    CommonModule,
    SuperadminPortalRoutingModule,
    MaterialModule,
    ComponentModule,
    DialogsModule,
    StoreModule.forFeature('user', userReducer),
  ],
})
export class SuperadminPortalModule {}
