import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from "@ngrx/store";

import * as fromMainStore from "./Reducers/MainStore/MainStore.reducer";

export interface State {
  MainStore: fromMainStore.MainStoreState;
}

export const Reducers: ActionReducerMap<State> = {
  MainStore: fromMainStore.MainStoreReducer,
};

export const GetMainStoreState = createFeatureSelector<
  fromMainStore.MainStoreState
>("MainStore");
export const GetMainStores = createSelector(
  GetMainStoreState,
  fromMainStore.GetMainStores
);
export const GetActiveMainStore = createSelector(
  GetMainStoreState,
  fromMainStore.GetActiveMainStore
);
export const GetIsActive = createSelector(
  GetMainStoreState,
  fromMainStore.GetIsActive
);
