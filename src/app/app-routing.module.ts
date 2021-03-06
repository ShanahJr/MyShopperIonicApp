import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'folder/Inbox',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'folder/:id',
  //   loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  // },
  {
    path: '',
    loadChildren: () => import('./Pages/main-store/main-store.module').then(m => m.MainStorePageModule)
  },
  {
    path: 'popover',
    loadChildren: () => import('./Components/popover/popover.module').then(m => m.PopoverPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./Components/modal/modal.module').then(m => m.ModalPageModule)
  },
  {
    path: 'store',
    loadChildren: () => import('./Pages/store/store.module').then(m => m.StorePageModule)
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('./Pages/shopping-list/shopping-list.module').then( m => m.ShoppingListPageModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./Pages/product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./Pages/category/category.module').then( m => m.CategoryPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
