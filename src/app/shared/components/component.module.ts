import { TableComponent } from './table/table.component';
import { FormComponent } from 'src/app/shared/components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';
import { AvatarModule } from 'ngx-avatar';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';

@NgModule({
  declarations: [
    LoadingComponent,
    ProfileMenuComponent,
    FormComponent,
    TableComponent,
    AutoCompleteComponent,
    BottomSheetComponent,
  ],
  imports: [MaterialModule, CommonModule, AvatarModule, ReactiveFormsModule],
  exports: [
    LoadingComponent,
    ProfileMenuComponent,
    FormComponent,
    TableComponent,
    AutoCompleteComponent,
    BottomSheetComponent,
  ],
  schemas: [],
})
export class ComponentModule {}
