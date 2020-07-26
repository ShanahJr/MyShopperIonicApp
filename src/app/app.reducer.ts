import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from "@ngrx/store";

import * as fromMainStore from "./Reducers/MainStore/MainStore.reducer";
import * as fromStore from "./Reducers/Store/Store.reducer";
import * as fromShoppingList from "./Reducers/ShoppingList/ShoppingList.reducer";

export interface State {
  MainStore: fromMainStore.MainStoreState;
  Store: fromStore.StoreState;
  ShoppingList: fromShoppingList.ShoppingListState;
}

export const Reducers: ActionReducerMap<State> = {
  MainStore: fromMainStore.MainStoreReducer,
  Store: fromStore.StoreReducer,
  ShoppingList: fromShoppingList.ShoppingListReducer,
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
