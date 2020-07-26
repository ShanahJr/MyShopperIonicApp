import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditShoppingListPage } from './edit-shopping-list.page';

const routes: Routes = [
  {
    path: '',
    component: EditShoppingListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditShoppingListPageRoutingModule {}
