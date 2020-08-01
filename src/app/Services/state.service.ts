import { Injectable } from "@angular/core";

import { CategoryModel } from "../Models/Category/category-model";
import { MainStoreModel } from "../Models/MainStore/main-store-model";
import { ProductModel } from "../Models/Product/product-model";
import { ShoppingListModel } from "../Models/ShoppingList/shopping-list-model";
import { ShoppingListProductModel } from "../Models/ShoppingListProduct/shopping-list-product-model";
import { ShoppingListStoreModel } from "../Models/ShoppingListStore/shopping-list-store-model";
import { StoreModel } from "../Models/Store/store-model";

@Injectable({
  providedIn: "root",
})
export class StateService {
  CurrentMainStore: MainStoreModel;
  CurrentStore: StoreModel;
  MainStoreID: Number;
  MainStoreArray: MainStoreModel[];

  ChangedStoreID: Number;

  constructor() {}
}
