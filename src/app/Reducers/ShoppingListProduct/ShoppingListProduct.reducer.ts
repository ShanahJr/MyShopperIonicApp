import { Action, createFeatureSelector, createSelector } from "@ngrx/store";

import {
  ShoppingListProductActions,
  SET_ACTIVE_SHOPPING_LIST_PRODUCT,
  REMOVE_ACTIVE_SHOPPING_LIST_PRODUCT,
  SET_SHOPPING_LIST_PRODUCTS,
  REMOVE_SHOPPING_LIST_PRODUCT,
  UPDATE_SHOPPING_LIST_PRODUCT,
  ADD_SHOPPING_LIST_PRODUCT,
} from "../../Reducers/ShoppingListProduct/ShoppingListProduct.actions";

import { ShoppingListProductModel } from "../../Models/ShoppingListProduct/shopping-list-product-model";
//import * as fromRoot from '../app.reducer';

export interface ShoppingListProductState {
  ShoppingListProducts: ShoppingListProductModel[];
  ActiveShoppingListProduct: ShoppingListProductModel;
}

// export interface State extends fromRoot.State {
//   training: TrainingState;
// }

const initialState: ShoppingListProductState = {
  ShoppingListProducts: [],
  ActiveShoppingListProduct: null,
};

export function ShoppingListProductReducer(
  state = initialState,
  action: ShoppingListProductActions
) {
  switch (action.type) {
    case SET_SHOPPING_LIST_PRODUCTS:
      return {
        ...state,
        ShoppingListProducts: action.payload,
      };

    case REMOVE_SHOPPING_LIST_PRODUCT:
      return {
        ...state,
        ShoppingListProducts: [
          ...state.ShoppingListProducts.filter((item) => {
            return item.shoppingListProductId != action.payload;
          }),
        ],
      };

    case ADD_SHOPPING_LIST_PRODUCT:
      return {
        ...state,
        ShoppingListProducts: [
          ...state.ShoppingListProducts.concat([action.payload]),
        ],
      };

    case UPDATE_SHOPPING_LIST_PRODUCT:
      return {
        ...state,
        ShoppingListProducts: [
          ...state.ShoppingListProducts.map((shoppinglistproduct) => {
            if (
              shoppinglistproduct.shoppingListProductId !==
              action.payload.shoppingListProductId
            ) {
              return shoppinglistproduct;
            } //end of if
            return {
              ...shoppinglistproduct,
              ...action.payload,
            };
          }),
        ],
      };

    case SET_ACTIVE_SHOPPING_LIST_PRODUCT:
      return {
        ...state,
        ActiveShoppingListProduct: {
          ...state.ShoppingListProducts.find(
            (ms) =>
              ms.shoppingListProductId == action.payload.shoppingListProductId
          ),
        },
      };

    case REMOVE_ACTIVE_SHOPPING_LIST_PRODUCT:
      return {
        ...state,
        ActiveShoppingListProduct: undefined,
      };

    default: {
      return state;
    }
  }
}

export const GetShoppingListProducts = (state: ShoppingListProductState) =>
  state.ShoppingListProducts;
export const GetActiveShoppingListProduct = (state: ShoppingListProductState) =>
  state.ActiveShoppingListProduct;
export const GetIsActive = (state: ShoppingListProductState) =>
  state.ActiveShoppingListProduct != null;
