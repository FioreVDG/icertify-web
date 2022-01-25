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

@NgModule({
  declarations: [VideoConferencingComponent, SetScheduleComponent, RoomComponent],
  imports: [
    CommonModule,
    VideoConferencingRoutingModule,
    MaterialModule,
    DialogsModule,
    ComponentModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class VideoConferencingModule {}
