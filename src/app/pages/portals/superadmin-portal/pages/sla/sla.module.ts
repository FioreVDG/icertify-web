import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlaRoutingModule } from './sla-routing.module';
import { SlaComponent } from './sla.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { UpsertSlaComponent } from './upsert-sla/upsert-sla.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModifyAgreementComponent } from './modify-agreement/modify-agreement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SlaComponent, UpsertSlaComponent, ModifyAgreementComponent],
  imports: [
    CommonModule,
    SlaRoutingModule,
    MaterialModule,
    ComponentModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class SlaModule {}
