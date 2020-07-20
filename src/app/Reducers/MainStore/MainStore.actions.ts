import { Action } from "@ngrx/store";

import { MainStoreModel } from "../../Models/MainStore/main-store-model";

export const SET_MAIN_STORES = "[MainStore] Set Main Stores";
export const SET_ACTIVE_MAIN_STORE = "[MainStore] Set Active MainStore";
export const REMOVE_ACTIVE_MAIN_STORE = "[MainStore] Remove Active MainStore";
export const REMOVE_MAIN_STORE = "[MainStore] Remove MainStore";
export const UPDATE_MAIN_STORE = "[MainStore] Upddate MainStore";
export const ADD_MAIN_STORE = "[MainStore] Add MainStore";
//export const STOP_TRAINING = '[Training] Stop Training';

export class SetMainStores implements Action {
  readonly type = SET_MAIN_STORES;

  constructor(public payload: MainStoreModel[]) {}
}

export class SetActiveMainStore implements Action {
  readonly type = SET_ACTIVE_MAIN_STORE;

  constructor(public payload: MainStoreModel) {}
}

export class AddMainStore implements Action {
  readonly type = ADD_MAIN_STORE;
  constructor(public payload: MainStoreModel) {}
}

export class UpdateMainStore implements Action {
  readonly type = UPDATE_MAIN_STORE;

  constructor(public payload: MainStoreModel) {}
}

export class RemoveMainStore implements Action {
  readonly type = REMOVE_MAIN_STORE;

  constructor(public payload: number) {}
}

export class RemoveActiveMainStore implements Action {
  readonly type = REMOVE_ACTIVE_MAIN_STORE;
}

export type MainStoreActions =
  | SetMainStores
  | SetActiveMainStore
  | RemoveActiveMainStore
  | AddMainStore
  | RemoveMainStore
  | UpdateMainStore;
