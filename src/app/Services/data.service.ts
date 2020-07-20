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
    private mainStoreStore: Store<fromMainStore.MainStoreState>
  ) {
    this.url = "https://localhost:6001/api/";
    //this.url = "https://myshopperapi.shanahjr.co.za/api/",
  } // Constructor

  // --------------------------- MainStore Section ---------------------------//
  GetAllMainStores() {
    return this.http
      .get<MainStoreModel[]>(this.url + "MainStore/")
      .subscribe((MainStores) => {
        this.mainStoreStore.dispatch(
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
      .post(this.url + "MainStore/", newMainStore)
      .subscribe((mainStore) => {
        this.mainStoreStore.dispatch(
          new MainStoreActions.AddMainStore(newMainStore)
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
        this.mainStoreStore.dispatch(
          new MainStoreActions.UpdateMainStore(EditedMainStore)
        );
      });
  } // Update MainStore

  DeleteMainStore(MainStoreID: Number, Position: number) {
    return this.http
      .delete(this.url + "MainStore/" + MainStoreID)
      .subscribe(() => {
        this.mainStoreStore.dispatch(
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
    return this.http.get<StoreModel[]>(this.url + "Store/GetStores/" + id);
  } // Get Stores under specified main store

  AddStore(newStore: StoreModel) {
    return this.http.post(this.url + "Store/", newStore);
  } // Add Store

  UpdateStore(EditedStore: StoreModel, StoreID: Number) {
    return this.http.put(this.url + "Store/" + StoreID, EditedStore);
  } // Update Store

  DeleteStore(StoreID: Number) {
    return this.http.delete(this.url + "Store/" + StoreID);
  } // Delete Store

  // // --------------------------- MainStoreStore Section ---------------------------//

  // GetAllMainStoreStores() {
  //   // const headers = {
  //   //   Authorization: "bearer " + localStorage.getItem("UserToken"),
  //   // };
  //   return this.http.get<MainStoreStoreModel[]>(this.url + "MainStoreStore/");
  // } // Get All MainStoreStores

  // GetMainStoreStore(MainStoreStoreID: Number) {
  //   // const headers = {
  //   //   Authorization: "bearer " + localStorage.getItem("UserToken"),
  //   // };
  //   return this.http.get<MainStoreStoreModel[]>(this.url + "MainStoreStore/" + MainStoreStoreID);
  // } // Get MainStoreStore

  // AddMainStoreStore(newMainStoreStore: MainStoreStoreModel) {
  //   return this.http.post(this.url + "MainStoreStore/", newMainStoreStore);
  // } // Add MainStoreStore

  // UpdateMainStoreStore(EditedStoreStore: MainStoreStoreModel , CurrentMainStoreID : Number) {
  //   return this.http.put(this.url + "MainStoreStore/" + CurrentMainStoreID, EditedStoreStore);
  // } // Update MainStoreStore

  // DeleteMainStoreStore(MainStoreStoreID: Number) {
  //   return this.http.delete(this.url + "MainStoreStore/" + MainStoreStoreID);
  // } // Delete MainStoreStore
} // End of DataService
