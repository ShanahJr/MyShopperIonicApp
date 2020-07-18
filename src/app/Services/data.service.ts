import { Injectable } from '@angular/core';
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


// const httpOptions = {
//   headers: new HttpHeaders({
//     "Access-Control-Allow-Origin": 'http://localhost:8100'
//   })
// }

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url: string;
  header: any;
  option: any;

  constructor(private http: HttpClient) {

    this.url = "https://localhost:6001/api/";
    //this.url = "https://myshopperapi.shanahjr.co.za/api/";


  }// Constructor

  // --------------------------- MainStore Section ---------------------------//

  // GetAllMainStores(): Observable<MainStoreModel[]> {
  //   // const headers = {
  //   //   Authorization: "bearer " + localStorage.getItem("UserToken"),
  //   // };
  //   return this.http.get<MainStoreModel[]>(this.url + "MainStore/");
  // } // Get All MainStores

  GetAllMainStores() {
    // const headers = {
    //   Authorization: "bearer " + localStorage.getItem("UserToken"),
    // };
    return this.http.get<MainStoreModel[]>(this.url + "MainStore/");
  } // Get All MainStores

  // async GetMainStores() {

  //   let promise = await new Promise((resolve, reject) => {

  //     this.http.get(this.url + "MainStore/").toPromise().then( res => {

  //       this.MainStoreArray = res.MainStoreArray.map( item => {

  //       })

  //     });
  //     resolve();

  //   });

  //   return promise;

  // }

  GetMainStore(id: Number) {
    // const headers = {
    //   Authorization: "bearer " + localStorage.getItem("UserToken"),
    // };
    return this.http.get<MainStoreModel>(this.url + "MainStore/" + id);
  } // Get MainStore

  AddMainStore(newMainStore: MainStoreModel) {
    return this.http.post(this.url + "MainStore/", newMainStore);
  } // Add MainStore

  UpdateMainStore(EditedMainStore: MainStoreModel, MainStoreID: Number) {
    return this.http.put(this.url + "MainStore/" + MainStoreID, EditedMainStore);
  } // Update MainStore

  DeleteMainStore(MainStoreID: Number) {
    return this.http.delete(this.url + "MainStore/" + MainStoreID);
  } // Delete MainStore

  // --------------------------- MainStoreStore Section ---------------------------//

  GetAllMainStoreStores() {
    // const headers = {
    //   Authorization: "bearer " + localStorage.getItem("UserToken"),
    // };
    return this.http.get<MainStoreStoreModel[]>(this.url + "MainStoreStore/");
  } // Get All MainStoreStores

  GetMainStoreStore(MainStoreStoreID: Number) {
    // const headers = {
    //   Authorization: "bearer " + localStorage.getItem("UserToken"),
    // };
    return this.http.get<MainStoreStoreModel[]>(this.url + "MainStoreStore/" + MainStoreStoreID);
  } // Get MainStoreStore

  AddMainStoreStore(newMainStoreStore: MainStoreStoreModel) {
    return this.http.post(this.url + "MainStoreStore/", newMainStoreStore);
  } // Add MainStoreStore

  UpdateMainStoreStore(EditedStoreStore: MainStoreStoreModel) {
    return this.http.put(this.url + "MainStoreStore/", EditedStoreStore);
  } // Update MainStoreStore

  DeleteMainStoreStore(MainStoreStoreID: Number) {
    return this.http.delete(this.url + "MainStoreStore/" + MainStoreStoreID);
  } // Delete MainStoreStore

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

  AddStore(newMainStore: StoreModel, id: Number) {
    return this.http.post(this.url + "Store/" + id, newMainStore);
  } // Add Store

  UpdateStore(EditedStore: StoreModel, StoreID: Number) {
    return this.http.put(this.url + "Store/" + StoreID, EditedStore);
  } // Update Store

  DeleteStore(StoreID: Number) {
    return this.http.delete(this.url + "Store/" + StoreID);
  } // Delete Store

}// End of DataService

