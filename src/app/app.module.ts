import { MaterialModule } from './shared/material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { AgoraConfig, NgxAgoraModule } from 'ngx-agora';

const agoraConfig: AgoraConfig = {
  AppID: '4b117526903f4bc4a60134e23047a1a8',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    StoreModule.forRoot({}),
    NgxAgoraModule.forRoot(agoraConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
