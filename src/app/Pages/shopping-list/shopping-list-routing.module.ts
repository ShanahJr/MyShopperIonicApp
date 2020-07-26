import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListPage } from './shopping-list.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppingListPage
  },
  {
    path: 'create-shopping-list',
    loadChildren: () => import('./create-shopping-list/create-shopping-list.module').then( m => m.CreateShoppingListPageModule)
  },
  {
    path: 'edit-shopping-list',
    loadChildren: () => import('./edit-shopping-list/edit-shopping-list.module').then( m => m.EditShoppingListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingListPageRoutingModule {}
