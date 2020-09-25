import { Action } from "@ngrx/store";

import { ShoppingListProductModel } from "../../Models/ShoppingListProduct/shopping-list-product-model";

export const SET_SHOPPING_LIST_PRODUCTS =
  "[ShoppingListProduct] Set Main Stores";
export const SET_ACTIVE_SHOPPING_LIST_PRODUCT =
  "[ShoppingListProduct] Set Active ShoppingListProduct";
export const REMOVE_ACTIVE_SHOPPING_LIST_PRODUCT =
  "[ShoppingListProduct] Remove Active ShoppingListProduct";
export const REMOVE_SHOPPING_LIST_PRODUCT =
  "[ShoppingListProduct] Remove ShoppingListProduct";
export const UPDATE_SHOPPING_LIST_PRODUCT =
  "[ShoppingListProduct] Upddate ShoppingListProduct";
export const ADD_SHOPPING_LIST_PRODUCT =
  "[ShoppingListProduct] Add ShoppingListProduct";
//export const STOP_TRAINING = '[Training] Stop Training';

export class SetShoppingListProducts implements Action {
  readonly type = SET_SHOPPING_LIST_PRODUCTS;

  constructor(public payload: ShoppingListProductModel[]) {}
}

export class SetActiveShoppingListProduct implements Action {
  readonly type = SET_ACTIVE_SHOPPING_LIST_PRODUCT;

  constructor(public payload: ShoppingListProductModel) {}
}

export class AddShoppingListProduct implements Action {
  readonly type = ADD_SHOPPING_LIST_PRODUCT;
  constructor(public payload: ShoppingListProductModel) {}
}

export class UpdateShoppingListProduct implements Action {
  readonly type = UPDATE_SHOPPING_LIST_PRODUCT;

  constructor(public payload: ShoppingListProductModel) {}
}

export class RemoveShoppingListProduct implements Action {
  readonly type = REMOVE_SHOPPING_LIST_PRODUCT;

  constructor(public payload: number) {}
}

export class RemoveActiveShoppingListProduct implements Action {
  readonly type = REMOVE_ACTIVE_SHOPPING_LIST_PRODUCT;
}

export type ShoppingListProductActions =
  | SetShoppingListProducts
  | SetActiveShoppingListProduct
  | RemoveActiveShoppingListProduct
  | AddShoppingListProduct
  | RemoveShoppingListProduct
  | UpdateShoppingListProduct;
