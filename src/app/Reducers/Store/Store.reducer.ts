import { Action, createFeatureSelector, createSelector } from "@ngrx/store";

import {
  StoreActions,
  SET_ACTIVE_STORE,
  REMOVE_ACTIVE_STORE,
  SET_STORES,
  REMOVE_STORE,
  UPDATE_STORE,
  ADD_STORE,
} from "../../Reducers/Store/Store.actions";

import { StoreModel } from "../../Models/Store/store-model";
//import * as fromRoot from '../app.reducer';

export interface StoreState {
  Stores: StoreModel[];
  ActiveStore: StoreModel;
}

// export interface State extends fromRoot.State {
//   training: TrainingState;
// }

const initialState: StoreState = {
  Stores: [],
  ActiveStore: null,
};

export function StoreReducer(state = initialState, action: StoreActions) {
  switch (action.type) {
    case SET_STORES:
      return {
        ...state,
        Stores: action.payload,
      };

    case REMOVE_STORE:
      return {
        ...state,
        Stores: [
          ...state.Stores.filter((item) => {
            return item.storeId != action.payload;
          }),
        ],
      };

    case ADD_STORE:
      return {
        ...state,
        Stores: [...state.Stores.concat([action.payload])],
      };

    case UPDATE_STORE:
      return {
        ...state,
        Stores: [
          ...state.Stores.map((store) => {
            if (store.storeId !== action.payload.storeId) {
              return store;
            } //end of if
            return {
              ...store,
              ...action.payload,
            };
          }),
        ],
      };

    case SET_ACTIVE_STORE:
      return {
        ...state,
        ActiveStore: {
          ...state.Stores.find((ms) => ms.storeId == action.payload.storeId),
        },
      };

    case REMOVE_ACTIVE_STORE:
      return {
        ...state,
        ActiveStore: undefined,
      };

    default: {
      return state;
    }
  }
}

export const GetStores = (state: StoreState) => state.Stores;
export const GetActiveStore = (state: StoreState) => state.ActiveStore;
export const GetIsActive = (state: StoreState) => state.ActiveStore != null;

// export const GetMainStoreState = createFeatureSelector<MainStoreState>('MainStore');

// export const GetMainStores = createSelector(GetMainStoreState, (state: MainStoreState) => state.MainStores);
// export const GetActiveMainStore = createSelector(GetMainStoreState, (state: MainStoreState) => state.ActiveMainStore);
// export const GetIsActive = createSelector(GetMainStoreState, (state: MainStoreState) => state.ActiveMainStore != null);
