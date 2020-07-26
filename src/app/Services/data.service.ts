import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { from, Observable } from "rxjs";

import { CategoryModel } from "../Models/Category/category-model";
import { MainStoreModel } from "../Models/MainStore/main-store-model";
import { MainStoreStoreModel } from "../Models/MainStoreStore/main-store-store-model";
import { PriceModel } from "../Models/Price/price-model";
import { ProductModel } from "../Models/Product/product-model";
import { ProductCategoryModel } from "../Models/ProductCategory/product-category-model";
import { ProductPriceModel } from "../Models/ProductPrice/product-price-model";
import { ShoppingListModel } from "../Models/ShoppingList/shopping-list-model";
import { ShoppingListProductModel } from "../Models/ShoppingListProduct/shopping-list-product-model";
import { ShoppingListStoreModel } from "../Models/ShoppingListStore/shopping-list-store-model";
import { StoreModel } from "../Models/Store/store-model";

import { take } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as MainStoreActions from "../Reducers/MainStore/MainStore.actions";
import * as fromMainStore from "../Reducers/MainStore/MainStore.reducer";
import * as fromStore from "../Reducers/Store/Store.reducer";
import * as StoreActions from "../Reducers/Store/Store.actions";
import * as fromShoppingList from "../Reducers/ShoppingList/ShoppingList.reducer";
import * as ShoppingListActions from "../Reducers/ShoppingList/ShoppingList.actions";

// const httpOptions = {
//   headers: new HttpHeaders({
//     "Access-Control-Allow-Origin": 'http://localhost:8100'
//   })
// }

@Injectable({
  providedIn: "root",
})
export class DataService {
  url: string;
  header: any;
  option: any;

  constructor(
    private http: HttpClient,
    private MainStoreState: Store<fromMainStore.MainStoreState>,
    private StoreState: Store<fromStore.StoreState>,
    private ShoppingListState: Store<fromShoppingList.ShoppingListState>
  ) {
    this.url = "https://localhost:6001/api/";
    //this.url = "https://myshopperapi.shanahjr.co.za/api/";
  } // Constructor

  // --------------------------- MainStore Section ---------------------------//
  GetAllMainStores() {
    return this.http
      .get<MainStoreModel[]>(this.url + "MainStore/")
      .pipe(take(1))
      .subscribe((MainStores) => {
        this.MainStoreState.dispatch(
          new MainStoreActions.SetMainStores(MainStores)
        );
        //You can enter in some error handling later after this
      }); // end of subscription
  } // Get All MainStores

  GetMainStore(id: Number) {
    // const headers = {
    //   Authorization: "bearer " + localStorage.getItem("UserToken"),
    // };
    return this.http.get<MainStoreModel>(this.url + "MainStore/" + id);
  } // Get MainStore

  AddMainStore(newMainStore: MainStoreModel) {
    return this.http
      .post<MainStoreModel>(this.url + "MainStore/", newMainStore)
      .pipe(take(1))
      .subscribe((mainStore) => {
        this.MainStoreState.dispatch(
          new MainStoreActions.AddMainStore(mainStore)
        );
      });
  } // Add MainStore

  UpdateMainStore(EditedMainStore: MainStoreModel, MainStoreID: Number) {
    return this.http
      .put<MainStoreModel>(
        this.url + "MainStore/" + MainStoreID,
        EditedMainStore
      )
      .pipe(take(1))
      .subscribe(() => {
        this.MainStoreState.dispatch(
          new MainStoreActions.UpdateMainStore(EditedMainStore)
        );
      });
  } // Update MainStore

  DeleteMainStore(MainStoreID: Number, Position: number) {
    return this.http
      .delete(this.url + "MainStore/" + MainStoreID)
      .pipe(take(1))
      .subscribe(() => {
        this.MainStoreState.dispatch(
          new MainStoreActions.RemoveMainStore(Position)
        );
      });
  } // Delete MainStore

  // --------------------------- Store Section ---------------------------//
  GetAllStores() {
    // const headers = {
    //   Authorization: "bearer " + localStorage.getItem("UserToken"),
    // };
    return this.http.get<StoreModel[]>(this.url + "Store/");
  } // Get All Stores

  GetStore(id: Number) {
    // const headers = {
    //   Authorization: "bearer " + localStorage.getItem("UserToken"),
    // };
    return this.http.get<StoreModel>(this.url + "Store/" + id);
  } // Get Store

  GetStores(id: Number) {
    return this.http
      .get<StoreModel[]>(this.url + "Store/GetStores/" + id)
      .pipe(take(1))
      .subscribe((stores) => {
        this.StoreState.dispatch(new StoreActions.SetStores(stores));
      });
  } // Get Stores under specified main store

  AddStore(newStore: StoreModel) {
    return this.http
      .post<StoreModel>(this.url + "Store/", newStore)
      .pipe(take(1))
      .subscribe((store) => {
        this.StoreState.dispatch(new StoreActions.AddStore(store));
      });
  } // Add Store

  UpdateStore(
    EditedStore: StoreModel,
    StoreID: number,
    MainStoreChange: boolean
  ) {
    return this.http
      .put(this.url + "Store/" + StoreID, EditedStore)
      .pipe(take(1))
      .subscribe(() => {
        this.StoreState.dispatch(new StoreActions.UpdateStore(EditedStore));
        if (MainStoreChange == true) {
          this.StoreState.dispatch(new StoreActions.RemoveStore(StoreID));
        }
      });
  } // Update Store

  DeleteStore(StoreID: number) {
    return this.http
      .delete(this.url + "Store/" + StoreID)
      .pipe(take(1))
      .subscribe(() => {
        this.StoreState.dispatch(new StoreActions.RemoveStore(StoreID));
      });
  } // Delete Store

  // --------------------------- Shopping List Section ---------------------------//
  GetAllShoppingLists() {
    // const headers = {
    //   Authorization: "bearer " + localStorage.getItem("UserToken"),
    // };
    return this.http.get<ShoppingListModel[]>(this.url + "ShoppingList/");
  } // Get All ShoppingLists

  GetShoppingList(id: Number) {
    // const headers = {
    //   Authorization: "bearer " + localStorage.getItem("UserToken"),
    // };
    return this.http.get<ShoppingListModel>(this.url + "ShoppingList/" + id);
  } // Get ShoppingList

  GetShoppingLists(id: Number) {
    return this.http
      .get<ShoppingListModel[]>(
        this.url + "ShoppingList/GetShoppingLists/" + id
      )
      .pipe(take(1))
      .subscribe((shoppingLists) => {
        this.ShoppingListState.dispatch(
          new ShoppingListActions.SetShoppingLists(shoppingLists)
        );
      });
  } // Get ShoppingLists under specified main shoppingList

  AddShoppingList(newShoppingList: ShoppingListModel) {
    return this.http
      .post<ShoppingListModel>(this.url + "ShoppingList/", newShoppingList)
      .pipe(take(1))
      .subscribe((shoppingList) => {
        this.ShoppingListState.dispatch(
          new ShoppingListActions.AddShoppingList(shoppingList)
        );
      });
  } // Add ShoppingList

  UpdateShoppingList(
    EditedShoppingList: ShoppingListModel,
    ShoppingListID: number,
    StoreChange: boolean
  ) {
    return this.http
      .put(this.url + "ShoppingList/" + ShoppingListID, EditedShoppingList)
      .pipe(take(1))
      .subscribe(() => {
        this.ShoppingListState.dispatch(
          new ShoppingListActions.UpdateShoppingList(EditedShoppingList)
        );
        if (StoreChange == true) {
          this.ShoppingListState.dispatch(
            new ShoppingListActions.RemoveShoppingList(ShoppingListID)
          );
        }
      });
  } // Update ShoppingList

  DeleteShoppingList(ShoppingListID: number) {
    return this.http
      .delete(this.url + "ShoppingList/" + ShoppingListID)
      .pipe(take(1))
      .subscribe(() => {
        this.ShoppingListState.dispatch(
          new ShoppingListActions.RemoveShoppingList(ShoppingListID)
        );
      });
  } // Delete ShoppingList
}
