import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListProductsPage } from './shopping-list-products.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppingListProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingListProductsPageRoutingModule {}
