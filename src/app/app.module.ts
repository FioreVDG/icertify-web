import { MaterialModule } from './shared/material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { AgoraConfig, NgxAgoraModule } from 'ngx-agora';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = {
  url: 'https://icertify-server.herokuapp.com/', // socket server url;
  options: {},
};
const agoraConfig: AgoraConfig = {
  AppID: '4b117526903f4bc4a60134e23047a1a8',
};

@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    SocketIoModule.forRoot(config),

    StoreModule.forRoot({}),
    NgxAgoraModule.forRoot(agoraConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
