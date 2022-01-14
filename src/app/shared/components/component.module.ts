import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [LoadingComponent, TableComponent, FormComponent],
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  exports: [LoadingComponent, TableComponent, FormComponent],
  schemas: [],
})
export class ComponentModule {}
