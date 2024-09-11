import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FallidoPage } from './fallido.page';

const routes: Routes = [
  {
    path: '',
    component: FallidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FallidoPageRoutingModule {}
