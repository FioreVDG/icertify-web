import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPortalRoutingModule } from './user-portal-routing.module';
import { UserPortalComponent } from './user-portal.component';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { StoreModule } from '@ngrx/store';
import { userReducer } from 'src/app/store/user/user.reducer';

@NgModule({
  declarations: [UserPortalComponent],
  imports: [
    CommonModule,
    ComponentModule,
    UserPortalRoutingModule,
    MaterialModule,
    StoreModule.forFeature('user', userReducer),
  ],
})
export class UserPortalModule {}
