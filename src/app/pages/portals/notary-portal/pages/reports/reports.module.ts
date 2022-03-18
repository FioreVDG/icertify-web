import { HighchartsChartModule } from 'highcharts-angular';
import { ReportsComponent } from './reports.component';
import { MaterialModule } from './../../../../../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';

@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HighchartsChartModule,
  ],
})
export class ReportsModule {}
