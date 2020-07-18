import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StorePage } from './store.page';

const routes: Routes = [
  {
    path: '',
    component: StorePage
  },
  {
    path: 'create-store',
    loadChildren: () => import('./create-store/create-store.module').then( m => m.CreateStorePageModule)
  },
  {
    path: 'edit-store',
    loadChildren: () => import('./edit-store/edit-store.module').then( m => m.EditStorePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorePageRoutingModule {}
