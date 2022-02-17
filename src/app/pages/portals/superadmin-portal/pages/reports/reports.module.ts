import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from './../../../../../shared/components/component.module';
import { MaterialModule } from './../../../../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ComponentModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
  ],
})
export class ReportsModule {}
