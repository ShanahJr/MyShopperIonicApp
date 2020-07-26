import { Action } from "@ngrx/store";

import { ShoppingListModel } from "../../Models/ShoppingList/shopping-list-model";

export const SET_SHOPPING_LISTS = "[ShoppingList] Set Shopping Lists";
export const SET_ACTIVE_SHOPPING_LIST =
  "[ShoppingList] Set Active Shopping List";
export const REMOVE_ACTIVE_SHOPPING_LIST =
  "[ShoppingList] Remove Active Shopping List";
export const REMOVE_SHOPPING_LIST = "[ShoppingList] Remove Shopping List";
export const UPDATE_SHOPPING_LIST = "[ShoppingList] Upddate Shopping List";
export const ADD_SHOPPING_LIST = "[ShoppingList] Add Shopping List";
//export const STOP_TRAINING = '[Training] Stop Training';

export class SetShoppingLists implements Action {
  readonly type = SET_SHOPPING_LISTS;

  constructor(public payload: ShoppingListModel[]) {}
}

export class SetActiveShoppingList implements Action {
  readonly type = SET_ACTIVE_SHOPPING_LIST;

  constructor(public payload: ShoppingListModel) {}
}

export class AddShoppingList implements Action {
  readonly type = ADD_SHOPPING_LIST;
  constructor(public payload: ShoppingListModel) {}
}

export class UpdateShoppingList implements Action {
  readonly type = UPDATE_SHOPPING_LIST;

  constructor(public payload: ShoppingListModel) {}
}

export class RemoveShoppingList implements Action {
  readonly type = REMOVE_SHOPPING_LIST;

  constructor(public payload: number) {}
}

export class RemoveActiveShoppingList implements Action {
  readonly type = REMOVE_ACTIVE_SHOPPING_LIST;
}

export type ShoppingListActions =
  | SetShoppingLists
  | SetActiveShoppingList
  | RemoveActiveShoppingList
  | AddShoppingList
  | RemoveShoppingList
  | UpdateShoppingList;
