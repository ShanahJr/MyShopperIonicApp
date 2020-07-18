import { Injectable } from '@angular/core';

import { CategoryModel } from "../Models/Category/category-model";
import { MainStoreModel } from "../Models/MainStore/main-store-model";
import { MainStoreStoreModel } from "../Models/MainStoreStore/main-store-store-model";
import { PriceModel } from "../Models/Price/price-model";
import { ProductModel } from "../Models/Product/product-model";
import { ProductCategoryModel } from "../Models/ProductCategory/product-category-model";
import { ProductPriceModel } from "../Models/ProductPrice/product-price-model";
import { ShoppingListModel } from "../Models/ShoppingList/shopping-list-model";
import { ShoppingListProductModel } from "../Models/ShoppingListProduct/shopping-list-product-model";
import { ShoppingListStoreModel } from "../Models/ShoppingListStore/shopping-list-store-model";
import { StoreModel } from "../Models/Store/store-model";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  CurrentMainStore: MainStoreModel;
  CurrentStore: StoreModel;
  MainStoreID: Number;
  MainStoreArray: MainStoreModel[];

  constructor() { }
}
