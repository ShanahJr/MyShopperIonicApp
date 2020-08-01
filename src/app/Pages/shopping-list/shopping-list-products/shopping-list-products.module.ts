import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingListProductsPageRoutingModule } from './shopping-list-products-routing.module';

import { ShoppingListProductsPage } from './shopping-list-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingListProductsPageRoutingModule
  ],
  declarations: [ShoppingListProductsPage]
})
export class ShoppingListProductsPageModule {}
