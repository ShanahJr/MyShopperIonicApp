import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateMainPagePage } from './create-main-page.page';

const routes: Routes = [
  {
    path: '',
    component: CreateMainPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateMainPagePageRoutingModule {}
