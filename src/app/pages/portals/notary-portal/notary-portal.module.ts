import { MaterialModule } from './../../../shared/material/material.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotaryPortalRoutingModule } from './notary-portal-routing.module';
import { NotaryPortalComponent } from './notary-portal.component';
import { ComponentModule } from 'src/app/shared/components/component.module';

@NgModule({
  declarations: [NotaryPortalComponent],
  imports: [
    CommonModule,
    NotaryPortalRoutingModule,
    MaterialModule,
    ComponentModule,
  ],
})
export class NotaryPortalModule {}
