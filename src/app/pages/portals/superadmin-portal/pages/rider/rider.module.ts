import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from './../../../../../shared/components/component.module';
import { MaterialModule } from './../../../../../shared/material/material.module';

import { RiderRoutingModule } from './rider-routing.module';
import { RiderComponent } from './rider.component';
import { UpsertRiderComponent } from './upsert-rider/upsert-rider.component';

@NgModule({
  declarations: [RiderComponent, UpsertRiderComponent],
  imports: [CommonModule, RiderRoutingModule, ComponentModule, MaterialModule],
})
export class RiderModule {}
