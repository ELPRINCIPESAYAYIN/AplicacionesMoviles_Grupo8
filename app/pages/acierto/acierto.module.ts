import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AciertoPageRoutingModule } from './acierto-routing.module';

import { AciertoPage } from './acierto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AciertoPageRoutingModule
  ],
  declarations: [AciertoPage]
})
export class AciertoPageModule {}
