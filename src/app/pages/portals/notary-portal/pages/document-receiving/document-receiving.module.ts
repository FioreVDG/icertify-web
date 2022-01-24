import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentReceivingRoutingModule } from './document-receiving-routing.module';
import { DocumentReceivingComponent } from './document-receiving.component';


@NgModule({
  declarations: [
    DocumentReceivingComponent
  ],
  imports: [
    CommonModule,
    DocumentReceivingRoutingModule
  ]
})
export class DocumentReceivingModule { }
