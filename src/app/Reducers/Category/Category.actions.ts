import { Action } from "@ngrx/store";

import { CategoryModel } from "../../Models/Category/category-model";

export const SET_CATEGORYS = "[Category] Set Categorys";
export const SET_ACTIVE_CATEGORY = "[Category] Set Active Category";
export const REMOVE_ACTIVE_CATEGORY = "[Category] Remove Active Category";
export const REMOVE_CATEGORY = "[Category] Remove Category";
export const UPDATE_CATEGORY = "[Category] Upddate Category";
export const ADD_CATEGORY = "[Category] Add Category";
//export const STOP_TRAINING = '[Training] Stop Training';

export class SetCategorys implements Action {
  readonly type = SET_CATEGORYS;

  constructor(public payload: CategoryModel[]) {}
}

export class SetActiveCategory implements Action {
  readonly type = SET_ACTIVE_CATEGORY;

  constructor(public payload: CategoryModel) {}
}

export class AddCategory implements Action {
  readonly type = ADD_CATEGORY;
  constructor(public payload: CategoryModel) {}
}

export class UpdateCategory implements Action {
  readonly type = UPDATE_CATEGORY;

  constructor(public payload: CategoryModel) {}
}

export class RemoveCategory implements Action {
  readonly type = REMOVE_CATEGORY;

  constructor(public payload: number) {}
}

export class RemoveActiveCategory implements Action {
  readonly type = REMOVE_ACTIVE_CATEGORY;
}

export type CategoryActions =
  | SetCategorys
  | SetActiveCategory
  | RemoveActiveCategory
  | AddCategory
  | RemoveCategory
  | UpdateCategory;
