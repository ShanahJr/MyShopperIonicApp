import { Action, createFeatureSelector, createSelector } from "@ngrx/store";

import {
  CategoryActions,
  SET_ACTIVE_CATEGORY,
  REMOVE_ACTIVE_CATEGORY,
  SET_CATEGORYS,
  REMOVE_CATEGORY,
  UPDATE_CATEGORY,
  ADD_CATEGORY,
} from "../../Reducers/Category/Category.actions";

import { CategoryModel } from "../../Models/Category/category-model";
//import * as fromRoot from '../app.reducer';

export interface CategoryState {
  Categorys: CategoryModel[];
  ActiveCategory: CategoryModel;
}

// export interface State extends fromRoot.State {
//   training: TrainingState;
// }

const initialState: CategoryState = {
  Categorys: [],
  ActiveCategory: null,
};

export function CategoryReducer(state = initialState, action: CategoryActions) {
  switch (action.type) {
    case SET_CATEGORYS:
      return {
        ...state,
        Categorys: action.payload,
      };

    case REMOVE_CATEGORY:
      return {
        ...state,
        Categorys: [
          ...state.Categorys.filter((item) => {
            return item.categoryId != action.payload;
          }),
        ],
      };

    case ADD_CATEGORY:
      return {
        ...state,
        Categorys: [...state.Categorys.concat([action.payload])],
      };

    case UPDATE_CATEGORY:
      return {
        ...state,
        Categorys: [
          ...state.Categorys.map((category) => {
            if (category.categoryId !== action.payload.categoryId) {
              return category;
            } //end of if
            return {
              ...category,
              ...action.payload,
            };
          }),
        ],
      };

    case SET_ACTIVE_CATEGORY:
      return {
        ...state,
        ActiveCategory: {
          ...state.Categorys.find(
            (ms) => ms.categoryId == action.payload.categoryId
          ),
        },
      };

    case REMOVE_ACTIVE_CATEGORY:
      return {
        ...state,
        ActiveCategory: undefined,
      };

    default: {
      return state;
    }
  }
}

export const GetCategorys = (state: CategoryState) => state.Categorys;
export const GetActiveCategory = (state: CategoryState) => state.ActiveCategory;
export const GetIsActive = (state: CategoryState) =>
  state.ActiveCategory != null;
