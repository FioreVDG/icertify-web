import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';
import { AvatarModule } from 'ngx-avatar';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';

@NgModule({
  declarations: [LoadingComponent, ProfileMenuComponent],
  imports: [MaterialModule, CommonModule, AvatarModule],
  exports: [LoadingComponent, ProfileMenuComponent],
  schemas: [],
})
export class ComponentModule {}
