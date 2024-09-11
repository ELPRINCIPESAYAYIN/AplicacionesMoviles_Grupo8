import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FallidoPageRoutingModule } from './fallido-routing.module';

import { FallidoPage } from './fallido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FallidoPageRoutingModule
  ],
  declarations: [FallidoPage]
})
export class FallidoPageModule {}
