import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from './../material/material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreYouSureComponent } from './are-you-sure/are-you-sure.component';
import { ActionResultComponent } from './action-result/action-result.component';
import { ComponentModule } from '../components/component.module';
import { SpinnerLoadingComponent } from './spinner-loading/spinner-loading.component';
import { DocumentImageViewerComponent } from './document-image-viewer/document-image-viewer.component';
import { CounterComponent } from './counter/counter.component';

@NgModule({
  declarations: [AreYouSureComponent, ActionResultComponent, SpinnerLoadingComponent, DocumentImageViewerComponent, CounterComponent],
  imports: [CommonModule, MaterialModule, ComponentModule],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DialogsModule {}
