import { Action, createFeatureSelector, createSelector } from "@ngrx/store";

import {
  MainStoreActions,
  SET_ACTIVE_MAIN_STORE,
  REMOVE_ACTIVE_MAIN_STORE,
  SET_MAIN_STORES,
  REMOVE_MAIN_STORE,
  UPDATE_MAIN_STORE,
  ADD_MAIN_STORE,
} from "../../Reducers/MainStore/MainStore.actions";

// import {
//   TrainingActions,
//   SET_AVAILABLE_TRAININGS,
//   SET_FINISHED_TRAININGS,
//   START_TRAINING,
//   STOP_TRAINING
// } from './training.actions';

import { MainStoreModel } from "../../Models/MainStore/main-store-model";
import { sample } from "rxjs/operators";
//import * as fromRoot from '../app.reducer';

export interface MainStoreState {
  MainStores: MainStoreModel[];
  ActiveMainStore: MainStoreModel;
}

// export interface State extends fromRoot.State {
//   training: TrainingState;
// }

const initialState: MainStoreState = {
  MainStores: [],
  ActiveMainStore: null,
};

export function MainStoreReducer(
  state = initialState,
  action: MainStoreActions
) {
  switch (action.type) {
    case SET_MAIN_STORES:
      return {
        ...state,
        MainStores: action.payload,
      };

    case REMOVE_MAIN_STORE:
      return {
        ...state,
        MainStores: [
          ...state.MainStores.slice(0, action.payload),
          ...state.MainStores.slice(action.payload + 1),
        ],
      };
    case ADD_MAIN_STORE:
      return {
        ...state,
        MainStores: [...state.MainStores.concat([action.payload])],
      };

    // case UPDATE_MAIN_STORE:
    //   return {
    //     ...state,
    //     MainStores: [
    //       ...state.MainStores.slice(),
    //       ...state.MainStores.map((mainStore) => {
    //         if (mainStore.mainStoreId == action.payload.mainStoreId) {
    //           mainStore = action.payload;
    //         }
    //       }), //Map
    //     ],
    //   };

    case UPDATE_MAIN_STORE:
      return {
        ...state,
        MainStores: [
          ...state.MainStores.map((mainStore) => {
            if (mainStore.mainStoreId !== action.payload.mainStoreId) {
              console.log(mainStore + " not equal");
              return mainStore;
            } //end of if
            return {
              ...mainStore,
              ...action.payload,
            };
          }),
        ],
      };

    case SET_ACTIVE_MAIN_STORE:
      return {
        ...state,
        ActiveMainStore: {
          ...state.MainStores.find(
            (ms) => ms.mainStoreId == action.payload.mainStoreId
          ),
        },
      };

    case REMOVE_ACTIVE_MAIN_STORE:
      return {
        ...state,
        ActiveMainStore: null,
      };

    case REMOVE_ACTIVE_MAIN_STORE:
      return {
        ...state,
        ActiveMainStore: null,
      };

    default: {
      return state;
    }
  }
}

export const GetMainStores = (state: MainStoreState) => state.MainStores;
export const GetActiveMainStore = (state: MainStoreState) =>
  state.ActiveMainStore;
export const GetIsActive = (state: MainStoreState) =>
  state.ActiveMainStore != null;

// export const GetMainStoreState = createFeatureSelector<MainStoreState>('MainStore');

// export const GetMainStores = createSelector(GetMainStoreState, (state: MainStoreState) => state.MainStores);
// export const GetActiveMainStore = createSelector(GetMainStoreState, (state: MainStoreState) => state.ActiveMainStore);
// export const GetIsActive = createSelector(GetMainStoreState, (state: MainStoreState) => state.ActiveMainStore != null);
