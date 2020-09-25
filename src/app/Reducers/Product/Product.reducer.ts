import { Action, createFeatureSelector, createSelector } from "@ngrx/store";

import {
  ProductActions,
  SET_ACTIVE_PRODUCT,
  CONCAT_PRODUCTS,
  REMOVE_ACTIVE_PRODUCT,
  SET_PRODUCTS,
  REMOVE_PRODUCT,
  UPDATE_PRODUCT,
  ADD_PRODUCT,
  SET_PAGE_INFO,
  ADD_PAGE_NUMBER,
  SUBTRACT_PAGE_NUMBER,
} from "../../Reducers/Product/Product.actions";

import { ProductModel } from "../../Models/Product/product-model";
import { PageInfo } from "../../Models/PageInfo/page-info";
//import * as fromRoot from '../app.reducer';

export interface ProductState {
  Products: ProductModel[];
  ActiveProduct: ProductModel;
  pageInfo: PageInfo;
}

// export interface State extends fromRoot.State {
//   training: TrainingState;
// }

const initialState: ProductState = {
  Products: [],
  ActiveProduct: null,
  pageInfo: { pageNumber: 1, pageSize: 6, totalPages: 0, totalRecords: 0 },
};

export function ProductReducer(state = initialState, action: ProductActions) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        Products: action.payload,
      };
    case CONCAT_PRODUCTS:
      return {
        ...state,
        Products: state.Products.concat(...action.payload),
      };

    case SET_PAGE_INFO:
      return {
        ...state,
        pageInfo: action.payload,
      };

    case ADD_PAGE_NUMBER:
      return {
        ...state,
        pageInfo: {
          ...state.pageInfo,
          pageNumber: state.pageInfo.pageNumber + 1,
        },
      };

    case SUBTRACT_PAGE_NUMBER:
      return {
        ...state,
        pageInfo: {
          ...state.pageInfo,
          pageNumber: state.pageInfo.pageNumber - 1,
        },
      };

    // case SUBTRACT_PAGE_NUMBER:
    //   return state.pageInfo.pageNumber - 1;

    case REMOVE_PRODUCT:
      return {
        ...state,
        Products: [
          ...state.Products.filter((item) => {
            return item.productId != action.payload;
          }),
        ],
      };

    case ADD_PRODUCT:
      return {
        ...state,
        Products: [...state.Products.concat([action.payload])],
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
        Products: [
          ...state.Products.map((product) => {
            if (product.productId !== action.payload.productId) {
              return product;
            } //end of if
            return {
              ...product,
              ...action.payload,
            };
          }),
        ],
      };

    case SET_ACTIVE_PRODUCT:
      return {
        ...state,
        ActiveProduct: {
          ...state.Products.find(
            (ms) => ms.productId == action.payload.productId
          ),
        },
      };

    case REMOVE_ACTIVE_PRODUCT:
      return {
        ...state,
        ActiveProduct: undefined,
      };

    default: {
      return state;
    }
  }
}

export const GetProducts = (state: ProductState) => state.Products;
export const GetPageInfo = (state: ProductState) => state.pageInfo;
export const GetActiveProduct = (state: ProductState) => state.ActiveProduct;
export const GetIsActive = (state: ProductState) => state.ActiveProduct != null;

// export const GetMainProductState = createFeatureSelector<MainProductState>('MainProduct');

// export const GetMainProducts = createSelector(GetMainProductState, (state: MainProductState) => state.MainProducts);
// export const GetActiveMainProduct = createSelector(GetMainProductState, (state: MainProductState) => state.ActiveMainProduct);
// export const GetIsActive = createSelector(GetMainProductState, (state: MainProductState) => state.ActiveMainProduct != null);
