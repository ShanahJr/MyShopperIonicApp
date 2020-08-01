import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryPage } from './category.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryPage
  },
  {
    path: 'create-category',
    loadChildren: () => import('./create-category/create-category.module').then( m => m.CreateCategoryPageModule)
  },
  {
    path: 'edit-category',
    loadChildren: () => import('./edit-category/edit-category.module').then( m => m.EditCategoryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryPageRoutingModule {}
