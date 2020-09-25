import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { from, Observable } from "rxjs";

import { CategoryModel } from "../Models/Category/category-model";
import { MainStoreModel } from "../Models/MainStore/main-store-model";
import { ProductModel } from "../Models/Product/product-model";
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
import * as fromProduct from "../Reducers/Product/Product.reducer";
import * as ProductActions from "../Reducers/Product/Product.actions";
import * as fromCategory from "../Reducers/Category/Category.reducer";
import * as CategoryActions from "../Reducers/Category/Category.actions";
import * as fromShoppingListProduct from "../Reducers/ShoppingListProduct/ShoppingListProduct.reducer";
import * as ShoppingListProductActions from "../Reducers/ShoppingListProduct/ShoppingListProduct.actions";
import { PageInfo } from "../Models/PageInfo/page-info";

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
    private ShoppingListState: Store<fromShoppingList.ShoppingListState>,
    private ProductState: Store<fromProduct.ProductState>,
    private CategoryState: Store<fromCategory.CategoryState>,
    private ShoppingListProductState: Store<
      fromShoppingListProduct.ShoppingListProductState
    >
  ) {
    //this.url = "https://localhost:6001/api/";
    this.url = "https://myshopperapi.shanahjr.co.za/api/";
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

  // getShoppingListProducts(id: number) {
  //   this.http
  //     .get<ProductModel[]>(this.url + "Product/ShoppingListProduct/" + id)
  //     .pipe(take(1))
  //     .subscribe((products) => {
  //       this.ProductState.dispatch(new ProductActions.SetProducts(products));
  //     });
  // }

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

  // --------------------------- ShoppingList Product Section ---------------------------//
  getShoppingListProducts(id: number) {
    this.http
      .get<ShoppingListProductModel[]>(
        this.url + "ShoppingListProducts/GetShoppingList/" + id
      )
      .pipe(take(1))
      .subscribe((shoppingListProducts) => {
        this.ShoppingListProductState.dispatch(
          new ShoppingListProductActions.SetShoppingListProducts(
            shoppingListProducts
          )
        );
      });
  }
  AddShoppingListProducts(shoppingListProduct: ShoppingListProductModel) {
    return this.http
      .post<ShoppingListProductModel>(
        this.url + "ShoppingListProducts/",
        shoppingListProduct
      )
      .pipe(take(1))
      .subscribe((product) => {
        this.ShoppingListProductState.dispatch(
          new ShoppingListProductActions.AddShoppingListProduct(product)
        );
      });
  }

  UpdateShoppingListProduct(
    EditedShoppingListPrduct: ShoppingListProductModel,
    ShoppingListProductID: number
  ) {
    return this.http
      .put(
        this.url + "ShoppingListProducts/" + ShoppingListProductID,
        EditedShoppingListPrduct
      )
      .pipe(take(1))
      .subscribe(() => {
        this.ShoppingListState.dispatch(
          new ShoppingListProductActions.UpdateShoppingListProduct(
            EditedShoppingListPrduct
          )
        );
      });
  } // Update ShoppingList

  DeleteShoppingListProduct(id: number) {
    this.http
      .delete(this.url + "ShoppingListProducts/" + id)
      .pipe(take(1))
      .subscribe(() => {
        this.ShoppingListProductState.dispatch(
          new ShoppingListProductActions.RemoveShoppingListProduct(id)
        );
      });
  }

  // --------------------------- Product Section ---------------------------//
  GetAllProducts(pageInfo: PageInfo) {
    // const headers = {
    //   Authorization: "bearer " + localStorage.getItem("UserToken"),
    // };
    var info = new PageInfo();
    this.http
      .get<any>(
        this.url +
          "Product?pageNumber=" +
          pageInfo.pageNumber +
          "&pageSize=" +
          pageInfo.pageSize
      )
      .pipe(take(1))
      .subscribe((products) => {
        this.ProductState.dispatch(
          new ProductActions.SetProducts(products.data)
        );
        info.pageNumber = products.pageNumber;
        info.pageSize = products.pageSize;
        info.totalPages = products.totalPages;
        info.totalRecords = products.totalRecords;
        this.ProductState.dispatch(new ProductActions.SetPageInfo(info));
      });
  } // Get All Products

  SearchProducts(search: string, pageInfo: PageInfo) {
    var info = new PageInfo();
    this.http
      .get<any>(
        this.url +
          "Product/Search" +
          "?pageNumber=" +
          pageInfo.pageNumber +
          "&pageSize=" +
          pageInfo.pageSize +
          "&Search=" +
          search
      )
      .subscribe((response) => {
        info.pageNumber = response.pageNumber;
        info.pageSize = response.pageSize;
        info.totalPages = response.totalPages;
        info.totalRecords = response.totalRecords;
        this.ProductState.dispatch(new ProductActions.SetPageInfo(info));

        this.ProductState.dispatch(
          new ProductActions.SetProducts(response.data)
        );
      });
  }

  InfiniteProducts(search: string, pageInfo: PageInfo) {
    var info = new PageInfo();
    this.http
      .get<any>(
        this.url +
          "Product/Search" +
          "?pageNumber=" +
          pageInfo.pageNumber +
          "&pageSize=" +
          pageInfo.pageSize +
          "&Search=" +
          search
      )
      .subscribe((response) => {
        info.pageNumber = response.pageNumber;
        info.pageSize = response.pageSize;
        info.totalPages = response.totalPages;
        info.totalRecords = response.totalRecords;
        this.ProductState.dispatch(new ProductActions.SetPageInfo(info));

        this.ProductState.dispatch(
          new ProductActions.ConcatProducts(response.data)
        );
      });
  }

  GetProduct(id: Number) {
    // const headers = {
    //   Authorization: "bearer " + localStorage.getItem("UserToken"),
    // };
    return this.http.get<ProductModel>(this.url + "Product/" + id);
  } // Get Product

  GetProducts(id: Number) {
    return this.http
      .get<ProductModel[]>(this.url + "Product/GetProducts/" + id)
      .pipe(take(1))
      .subscribe((products) => {
        this.ProductState.dispatch(new ProductActions.SetProducts(products));
      });
  } // Get Products under specified main product

  AddProduct(newProduct: ProductModel) {
    return this.http
      .post<ProductModel>(this.url + "Product/", newProduct)
      .pipe(take(1))
      .subscribe((product) => {
        this.ProductState.dispatch(new ProductActions.AddProduct(product));
      });
  } // Add Product

  UpdateProduct(EditedProduct: ProductModel, ProductID: number) {
    return this.http
      .put(this.url + "Product/" + ProductID, EditedProduct)
      .pipe(take(1))
      .subscribe(() => {
        this.ProductState.dispatch(
          new ProductActions.UpdateProduct(EditedProduct)
        );
      });
  } // Update Product

  DeleteProduct(ProductID: number) {
    return this.http
      .delete(this.url + "Product/" + ProductID)
      .pipe(take(1))
      .subscribe(() => {
        this.ProductState.dispatch(new ProductActions.RemoveProduct(ProductID));
      });
  } // Delete Product

  // --------------------------- Category Section ---------------------------//
  GetAllCategorys() {
    // const headers = {
    //   Authorization: "bearer " + localStorage.getItem("UserToken"),
    // };
    return this.http
      .get<CategoryModel[]>(this.url + "Category/")
      .pipe(take(1))
      .subscribe((categorys) => {
        this.CategoryState.dispatch(
          new CategoryActions.SetCategorys(categorys)
        );
      });
  } // Get All Categorys

  GetCategory(id: Number) {
    // const headers = {
    //   Authorization: "bearer " + localStorage.getItem("UserToken"),
    // };
    return this.http
      .get<CategoryModel>(this.url + "Category/" + id)
      .pipe(take(1))
      .subscribe((category) => {
        this.CategoryState.dispatch(
          new CategoryActions.SetActiveCategory(category)
        );
      });
  } // Get Category

  GetCategorys(id: Number) {
    return this.http
      .get<CategoryModel[]>(this.url + "Category/GetCategorys/" + id)
      .pipe(take(1))
      .subscribe((categorys) => {
        this.CategoryState.dispatch(
          new CategoryActions.SetCategorys(categorys)
        );
      });
  } // Get Categorys under specified main category

  AddCategory(newCategory: CategoryModel) {
    return this.http
      .post<CategoryModel>(this.url + "Category/", newCategory)
      .pipe(take(1))
      .subscribe((category) => {
        this.CategoryState.dispatch(new CategoryActions.AddCategory(category));
      });
  } // Add Category

  UpdateCategory(EditedCategory: CategoryModel, CategoryID: number) {
    return this.http
      .put(this.url + "Category/" + CategoryID, EditedCategory)
      .pipe(take(1))
      .subscribe(() => {
        this.CategoryState.dispatch(
          new CategoryActions.UpdateCategory(EditedCategory)
        );
      });
  } // Update Category

  DeleteCategory(CategoryID: number) {
    return this.http
      .delete(this.url + "Category/" + CategoryID)
      .pipe(take(1))
      .subscribe(() => {
        this.CategoryState.dispatch(
          new CategoryActions.RemoveCategory(CategoryID)
        );
      });
  } // Delete Category
}
