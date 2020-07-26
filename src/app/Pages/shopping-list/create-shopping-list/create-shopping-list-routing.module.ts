import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateShoppingListPage } from './create-shopping-list.page';

const routes: Routes = [
  {
    path: '',
    component: CreateShoppingListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateShoppingListPageRoutingModule {}
