import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
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
import { ViewAttachmentsComponent } from './view-attachments/view-attachments.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ViewVideoComponent } from './view-video/view-video.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RtVideoComponent } from './rt-video/rt-video.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { StoreModule } from '@ngrx/store';
import { userReducer } from 'src/app/store/user/user.reducer';
import { ConferenceRoomComponent } from './conference-room/conference-room.component';
import { RoomComponent } from './room/room.component';
import { DocumentLogsViewerComponent } from './document-logs-viewer/document-logs-viewer.component';
import { DocumentTrackerTableComponent } from './document-tracker-table/document-tracker-table.component';
import { TransactionHistoryTableComponent } from './transaction-history-table/transaction-history-table.component';
import { ViewScreenshotComponent } from './view-screenshot/view-screenshot.component';
import { ViewProofOfIdentityComponent } from './view-proof-of-identity/view-proof-of-identity.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

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
    BottomSheetComponent,
    AutoCompleteComponent,
    ViewAttachmentsComponent,
    ViewVideoComponent,
    ConferenceRoomComponent,
    RtVideoComponent,
    RoomComponent,
    DocumentLogsViewerComponent,
    DocumentTrackerTableComponent,
    TransactionHistoryTableComponent,
    ViewScreenshotComponent,
    ViewProofOfIdentityComponent,
    ChangePasswordComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    AvatarModule,
    NgxDocViewerModule,
    NgxExtendedPdfViewerModule,
    NgxSkeletonLoaderModule,
    ReactiveFormsModule,
    FormsModule,
    NgxFileDropModule,
    StoreModule.forFeature('user', userReducer),
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
    BottomSheetComponent,
    ConferenceRoomComponent,
    AutoCompleteComponent,
    RtVideoComponent,
    DocumentTrackerTableComponent,
    TransactionHistoryTableComponent,
    DocumentLogsViewerComponent,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentModule {}
