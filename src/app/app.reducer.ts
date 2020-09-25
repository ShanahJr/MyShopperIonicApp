import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from "@ngrx/store";

import * as fromMainStore from "./Reducers/MainStore/MainStore.reducer";
import * as fromStore from "./Reducers/Store/Store.reducer";
import * as fromShoppingList from "./Reducers/ShoppingList/ShoppingList.reducer";
import * as fromProduct from "./Reducers/Product/Product.reducer";
import * as fromCategory from "./Reducers/Category/Category.reducer";
import * as fromShoppingListProduct from "./Reducers/ShoppingListProduct/ShoppingListProduct.reducer";

export interface State {
  MainStore: fromMainStore.MainStoreState;
  Store: fromStore.StoreState;
  ShoppingList: fromShoppingList.ShoppingListState;
  Product: fromProduct.ProductState;
  Category: fromCategory.CategoryState;
  ShoppingListProduct: fromShoppingListProduct.ShoppingListProductState;
}

export const Reducers: ActionReducerMap<State> = {
  MainStore: fromMainStore.MainStoreReducer,
  Store: fromStore.StoreReducer,
  ShoppingList: fromShoppingList.ShoppingListReducer,
  Product: fromProduct.ProductReducer,
  Category: fromCategory.CategoryReducer,
  ShoppingListProduct: fromShoppingListProduct.ShoppingListProductReducer,
};

//---------------Main Store Section-----------------------//
export const GetMainStoreState = createFeatureSelector<
  fromMainStore.MainStoreState
>("MainStore");
export const GetMainStores = createSelector(
  GetMainStoreState,
  fromMainStore.GetMainStores
);
export const GetActiveMainStore = createSelector(
  GetMainStoreState,
  fromMainStore.GetActiveMainStore
);
export const GetIsMainStoreActive = createSelector(
  GetMainStoreState,
  fromMainStore.GetIsActive
);

//--------------- Store Section-----------------------//
export const GetStoreState = createFeatureSelector<fromStore.StoreState>(
  "Store"
);
export const GetStores = createSelector(GetStoreState, fromStore.GetStores);

export const GetActiveStore = createSelector(
  GetStoreState,
  fromStore.GetActiveStore
);
export const GetIsStoreActive = createSelector(
  GetStoreState,
  fromStore.GetIsActive
);

//--------------- ShoppingList Section-----------------------//
export const GetShoppingListState = createFeatureSelector<
  fromShoppingList.ShoppingListState
>("ShoppingList");
export const GetShoppingLists = createSelector(
  GetShoppingListState,
  fromShoppingList.GetShoppingLists
);

export const GetActiveShoppingList = createSelector(
  GetShoppingListState,
  fromShoppingList.GetActiveShoppingList
);
export const GetIsShoppingListActive = createSelector(
  GetShoppingListState,
  fromShoppingList.GetIsActive
);

//--------------- Product Section-----------------------//
export const GetProductState = createFeatureSelector<fromProduct.ProductState>(
  "Product"
);
export const GetProducts = createSelector(
  GetProductState,
  fromProduct.GetProducts
);
export const GetPageInfo = createSelector(
  GetProductState,
  fromProduct.GetPageInfo
);

export const GetActiveProduct = createSelector(
  GetProductState,
  fromProduct.GetActiveProduct
);
export const GetIsProductActive = createSelector(
  GetProductState,
  fromProduct.GetIsActive
);

//--------------- Category Section-----------------------//
export const GetCategoryState = createFeatureSelector<
  fromCategory.CategoryState
>("Category");
export const GetCategorys = createSelector(
  GetCategoryState,
  fromCategory.GetCategorys
);

export const GetActiveCategory = createSelector(
  GetCategoryState,
  fromCategory.GetActiveCategory
);
export const GetIsCategoryActive = createSelector(
  GetCategoryState,
  fromCategory.GetIsActive
);

//--------------- ShoppingListProduct Section-----------------------//
export const GetShoppingListProductState = createFeatureSelector<
  fromShoppingListProduct.ShoppingListProductState
>("ShoppingListProduct");
export const GetShoppingListProducts = createSelector(
  GetShoppingListProductState,
  fromShoppingListProduct.GetShoppingListProducts
);

export const GetActiveShoppingListProduct = createSelector(
  GetShoppingListProductState,
  fromShoppingListProduct.GetActiveShoppingListProduct
);
export const GetIsShoppingListProductActive = createSelector(
  GetShoppingListProductState,
  fromShoppingListProduct.GetIsActive
);
