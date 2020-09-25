import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ShoppingListProductsPageRoutingModule } from "./shopping-list-products-routing.module";

import { ShoppingListProductsPage } from "./shopping-list-products.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ShoppingListProductsPageRoutingModule,
  ],
  declarations: [ShoppingListProductsPage],
})
export class ShoppingListProductsPageModule {}
