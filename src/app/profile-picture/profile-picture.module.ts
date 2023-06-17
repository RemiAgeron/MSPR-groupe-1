import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePicturePageRoutingModule } from './profile-picture-routing.module';

import { ProfilePicturePage } from './profile-picture.page';
import { InputModule } from '../components/input/input.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputModule,
    ProfilePicturePageRoutingModule
  ],
  declarations: [ProfilePicturePage]
})
export class ProfilePicturePageModule {}
