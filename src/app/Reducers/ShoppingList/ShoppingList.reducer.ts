import { Action, createFeatureSelector, createSelector } from "@ngrx/store";

import {
  ShoppingListActions,
  SET_ACTIVE_SHOPPING_LIST,
  REMOVE_ACTIVE_SHOPPING_LIST,
  SET_SHOPPING_LISTS,
  REMOVE_SHOPPING_LIST,
  UPDATE_SHOPPING_LIST,
  ADD_SHOPPING_LIST,
} from "../../Reducers/ShoppingList/ShoppingList.actions";

import { ShoppingListModel } from "../../Models/ShoppingList/shopping-list-model";
//import * as fromRoot from '../app.reducer';

export interface ShoppingListState {
  ShoppingLists: ShoppingListModel[];
  ActiveShoppingList: ShoppingListModel;
}

// export interface State extends fromRoot.State {
//   training: TrainingState;
// }

const initialState: ShoppingListState = {
  ShoppingLists: [],
  ActiveShoppingList: null,
};

export function ShoppingListReducer(
  state = initialState,
  action: ShoppingListActions
) {
  switch (action.type) {
    case SET_SHOPPING_LISTS:
      return {
        ...state,
        ShoppingLists: action.payload,
      };

    case REMOVE_SHOPPING_LIST:
      return {
        ...state,
        ShoppingLists: [
          ...state.ShoppingLists.filter((item) => {
            return item.shoppingListId != action.payload;
          }),
        ],
      };

    case ADD_SHOPPING_LIST:
      return {
        ...state,
        ShoppingLists: [...state.ShoppingLists.concat([action.payload])],
      };

    case UPDATE_SHOPPING_LIST:
      return {
        ...state,
        ShoppingLists: [
          ...state.ShoppingLists.map((shoppinglist) => {
            if (shoppinglist.shoppingListId !== action.payload.shoppingListId) {
              return shoppinglist;
            } //end of if
            return {
              ...shoppinglist,
              ...action.payload,
            };
          }),
        ],
      };

    case SET_ACTIVE_SHOPPING_LIST:
      return {
        ...state,
        ActiveShoppingList: {
          ...state.ShoppingLists.find(
            (ms) => ms.shoppingListId == action.payload.shoppingListId
          ),
        },
      };

    case REMOVE_ACTIVE_SHOPPING_LIST:
      return {
        ...state,
        ActiveShoppingList: undefined,
      };

    default: {
      return state;
    }
  }
}

export const GetShoppingLists = (state: ShoppingListState) =>
  state.ShoppingLists;
export const GetActiveShoppingList = (state: ShoppingListState) =>
  state.ActiveShoppingList;
export const GetIsActive = (state: ShoppingListState) =>
  state.ActiveShoppingList != null;
