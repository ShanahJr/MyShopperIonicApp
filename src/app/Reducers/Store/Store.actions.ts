import { Action } from "@ngrx/store";

import { StoreModel } from "../../Models/Store/store-model";

export const SET_STORES = "[Store] Set Stores";
export const SET_ACTIVE_STORE = "[Store] Set Active Store";
export const REMOVE_ACTIVE_STORE = "[Store] Remove Active Store";
export const REMOVE_STORE = "[Store] Remove Store";
export const UPDATE_STORE = "[Store] Upddate Store";
export const ADD_STORE = "[Store] Add Store";
//export const STOP_TRAINING = '[Training] Stop Training';

export class SetStores implements Action {
  readonly type = SET_STORES;

  constructor(public payload: StoreModel[]) {}
}

export class SetActiveStore implements Action {
  readonly type = SET_ACTIVE_STORE;

  constructor(public payload: StoreModel) {}
}

export class AddStore implements Action {
  readonly type = ADD_STORE;
  constructor(public payload: StoreModel) {}
}

export class UpdateStore implements Action {
  readonly type = UPDATE_STORE;

  constructor(public payload: StoreModel) {}
}

export class RemoveStore implements Action {
  readonly type = REMOVE_STORE;

  constructor(public payload: number) {}
}

export class RemoveActiveStore implements Action {
  readonly type = REMOVE_ACTIVE_STORE;
}

export type StoreActions =
  | SetStores
  | SetActiveStore
  | RemoveActiveStore
  | AddStore
  | RemoveStore
  | UpdateStore;
