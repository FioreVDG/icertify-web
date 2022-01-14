import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from './../material/material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreYouSureComponent } from './are-you-sure/are-you-sure.component';
import { ActionResultComponent } from './action-result/action-result.component';

@NgModule({
  declarations: [AreYouSureComponent, ActionResultComponent],
  imports: [CommonModule, MaterialModule],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DialogsModule {}
