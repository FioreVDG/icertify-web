import { ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { MaterialModule } from './../../../../../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotarialRoutingModule } from './notarial-routing.module';
import { NotarialComponent } from './notarial.component';
import { UpsertNotarialCommissionComponent } from './upsert-notarial-commission/upsert-notarial-commission.component';

@NgModule({
  declarations: [NotarialComponent, UpsertNotarialCommissionComponent],
  imports: [
    CommonModule,
    NotarialRoutingModule,
    MaterialModule,
    ComponentModule,
    ReactiveFormsModule,
  ],
})
export class NotarialModule {}
