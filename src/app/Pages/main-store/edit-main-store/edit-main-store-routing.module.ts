import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditMainStorePage } from './edit-main-store.page';

const routes: Routes = [
  {
    path: '',
    component: EditMainStorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditMainStorePageRoutingModule {}
