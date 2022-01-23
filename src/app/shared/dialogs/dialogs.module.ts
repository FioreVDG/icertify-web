import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from './../material/material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreYouSureComponent } from './are-you-sure/are-you-sure.component';
import { ActionResultComponent } from './action-result/action-result.component';
import { ComponentModule } from '../components/component.module';
import { SpinnerLoadingComponent } from './spinner-loading/spinner-loading.component';

@NgModule({
  declarations: [AreYouSureComponent, ActionResultComponent, SpinnerLoadingComponent],
  imports: [CommonModule, MaterialModule, ComponentModule],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DialogsModule {}
