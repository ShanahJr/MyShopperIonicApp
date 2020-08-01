import { Action } from "@ngrx/store";

import { ProductModel } from "../../Models/Product/product-model";
import { PageInfo } from "../../Models/PageInfo/page-info";

export const SET_PRODUCTS = "[Product] Set Products";
export const SET_PAGE_INFO = "[Product] Set Page Info";
export const ADD_PAGE_NUMBER = "[Product] Add Page Number";
export const SUBTRACT_PAGE_NUMBER = "[Product] Subtract Page Number";
export const SET_ACTIVE_PRODUCT = "[Product] Set Active Product";
export const REMOVE_ACTIVE_PRODUCT = "[Product] Remove Active Product";
export const REMOVE_PRODUCT = "[Product] Remove Product";
export const UPDATE_PRODUCT = "[Product] Upddate Product";
export const ADD_PRODUCT = "[Product] Add Product";
//export const STOP_TRAINING = '[Training] Stop Training';

export class SetProducts implements Action {
  readonly type = SET_PRODUCTS;

  constructor(public payload: ProductModel[]) {}
}
export class SetPageInfo implements Action {
  readonly type = SET_PAGE_INFO;

  constructor(public payload: PageInfo) {}
}
export class AddPageNumber implements Action {
  readonly type = ADD_PAGE_NUMBER;
}
export class SubtractPageNumber implements Action {
  readonly type = SUBTRACT_PAGE_NUMBER;
}

export class SetActiveProduct implements Action {
  readonly type = SET_ACTIVE_PRODUCT;

  constructor(public payload: ProductModel) {}
}

export class AddProduct implements Action {
  readonly type = ADD_PRODUCT;
  constructor(public payload: ProductModel) {}
}

export class UpdateProduct implements Action {
  readonly type = UPDATE_PRODUCT;

  constructor(public payload: ProductModel) {}
}

export class RemoveProduct implements Action {
  readonly type = REMOVE_PRODUCT;

  constructor(public payload: number) {}
}

export class RemoveActiveProduct implements Action {
  readonly type = REMOVE_ACTIVE_PRODUCT;
}

export type ProductActions =
  | SetProducts
  | SetActiveProduct
  | RemoveActiveProduct
  | AddProduct
  | RemoveProduct
  | SetPageInfo
  | AddPageNumber
  | SubtractPageNumber
  | UpdateProduct;
