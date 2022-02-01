import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { DialogsModule } from './../../../../../shared/dialogs/dialogs.module';
import { MaterialModule } from './../../../../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoConferencingRoutingModule } from './video-conferencing-routing.module';
import { VideoConferencingComponent } from './video-conferencing.component';
import { SetScheduleComponent } from './set-schedule/set-schedule.component';
import { RoomComponent } from './room/room.component';
import { WebcamModule } from 'ngx-webcam';
import { NgxCaptureModule } from 'ngx-capture';
import { MarkAsNotarizedComponent } from './room/mark-as-notarized/mark-as-notarized.component';

@NgModule({
  declarations: [
    VideoConferencingComponent,
    SetScheduleComponent,
    RoomComponent,
    MarkAsNotarizedComponent,
  ],
  imports: [
    CommonModule,
    VideoConferencingRoutingModule,
    MaterialModule,
    DialogsModule,
    ComponentModule,
    FormsModule,
    ReactiveFormsModule,
    WebcamModule,
    NgxCaptureModule,
  ],
})
export class VideoConferencingModule {}
