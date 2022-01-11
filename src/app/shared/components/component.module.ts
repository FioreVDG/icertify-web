import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [LoadingComponent],
  imports: [MaterialModule, CommonModule],
  exports: [LoadingComponent],
  schemas: [],
})
export class ComponentModule {}
