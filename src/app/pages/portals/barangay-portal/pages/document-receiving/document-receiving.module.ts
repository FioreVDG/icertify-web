import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentReceivingRoutingModule } from './document-receiving-routing.module';
import { DocumentReceivingComponent } from './document-receiving.component';
import { ComponentModule } from 'src/app/shared/components/component.module';

@NgModule({
  declarations: [DocumentReceivingComponent],
  imports: [CommonModule, DocumentReceivingRoutingModule, ComponentModule],
})
export class DocumentReceivingModule {}
