import { TableComponent } from './table/table.component';
import { FormComponent } from 'src/app/shared/components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';
import { AvatarModule } from 'ngx-avatar';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';

@NgModule({
  declarations: [
    LoadingComponent,
    ProfileMenuComponent,
    FormComponent,
    TableComponent,
  ],
  imports: [MaterialModule, CommonModule, AvatarModule, ReactiveFormsModule],
  exports: [
    LoadingComponent,
    ProfileMenuComponent,
    FormComponent,
    TableComponent,
  ],
  schemas: [],
})
export class ComponentModule {}
