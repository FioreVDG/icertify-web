import { TableComponent } from './table/table.component';
import { FormComponent } from 'src/app/shared/components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';
import { AvatarModule } from 'ngx-avatar';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { OtpComponent } from './otp/otp.component';
import { UploadComponent } from './upload/upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { RegistrantFormComponent } from './registrant-form/registrant-form.component';
import { ImageFormComponent } from './image-form/image-form.component';

@NgModule({
  declarations: [
    LoadingComponent,
    ProfileMenuComponent,
    FormComponent,
    TableComponent,
    OtpComponent,
    UploadComponent,
    RegistrantFormComponent,
    ImageFormComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    AvatarModule,
    ReactiveFormsModule,
    FormsModule,
    NgxFileDropModule,
  ],
  exports: [
    LoadingComponent,
    ProfileMenuComponent,
    FormComponent,
    TableComponent,
    UploadComponent,
    ImageFormComponent,
    RegistrantFormComponent,
    OtpComponent,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentModule {}
