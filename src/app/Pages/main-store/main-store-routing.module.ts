import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainStorePage } from './main-store.page';

const routes: Routes = [
  {
    path: '',
    component: MainStorePage
  },
  {
    path: 'create-main-store',
    loadChildren: () => import('./create-main-page/create-main-page.module').then(m => m.CreateMainPagePageModule)
  },
  {
    path: 'edit-main-store',
    loadChildren: () => import('./edit-main-store/edit-main-store.module').then(m => m.EditMainStorePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainStorePageRoutingModule { }
