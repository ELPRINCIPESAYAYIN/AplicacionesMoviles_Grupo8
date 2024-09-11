import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AciertoPage } from './acierto.page';

const routes: Routes = [
  {
    path: '',
    component: AciertoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AciertoPageRoutingModule {}
