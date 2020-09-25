import {
  Component,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
} from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "src/app/Services/data.service";
import { DomSanitizer } from "@angular/platform-browser";
import { FormControl } from "@angular/forms";

import { Observable } from "rxjs";
import { map, take, takeUntil } from "rxjs/operators";
import { Store } from "@ngrx/store";

import * as fromRoot from "../../../app.reducer";
import * as fromProduct from "../../../Reducers/Product/Product.reducer";
import * as ProductActions from "../../../Reducers/Product/Product.actions";
import * as fromShoppingList from "../../../Reducers/ShoppingList/ShoppingList.reducer";
import * as ShoppingListActions from "../../../Reducers/ShoppingList/ShoppingList.actions";
import * as fromShoppingListProduct from "../../../Reducers/ShoppingListProduct/ShoppingListProduct.reducer";
import * as ShoppingListProductActions from "../../../Reducers/ShoppingListProduct/ShoppingListProduct.actions";

// import { ModalController } from '@ionic/angular';
import { PopoverController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";

import { ShoppingListModel } from "../../../Models/ShoppingList/shopping-list-model";
import { ShoppingListProductModel } from "../../../Models/ShoppingListProduct/shopping-list-product-model";
import { ProductModel } from "../../../Models/Product/product-model";
import { PageInfo } from "../../../Models/PageInfo/page-info";
import { PopoverPage } from "../../../Components/popover/popover.page";
import { element } from "protractor";
@Component({
  selector: "app-shopping-list-products",
  templateUrl: "./shopping-list-products.page.html",
  styleUrls: ["./shopping-list-products.page.scss"],
})
export class ShoppingListProductsPage implements OnInit, AfterViewChecked {
  ActiveShoppingList$: Observable<ShoppingListModel>;
  ShoppingListProductArray$: Observable<ShoppingListProductModel[]>;
  ProductArray$: Observable<ProductModel[]>;
  pageInfo$: Observable<PageInfo>;
  ShowList = true;
  SearchString = new FormControl("");
  Total = 0;

  constructor(
    private dataService: DataService,
    private router: Router,
    // public modalController: ModalController,
    private alertController: AlertController,
    private popover: PopoverController,
    private sanitizer: DomSanitizer,
    private ShoppingListProductState: Store<
      fromShoppingListProduct.ShoppingListProductState
    >,
    private ShoppingListState: Store<fromShoppingList.ShoppingListState>,
    private ProductState: Store<fromProduct.ProductState>
  ) {}

  ngOnInit() {
    this.ActiveShoppingList$ = this.ShoppingListState.select(
      fromRoot.GetActiveShoppingList
    );

    this.ProductArray$ = this.ProductState.select(fromRoot.GetProducts);

    this.ActiveShoppingList$.pipe(take(1)).subscribe((shoppingList) => {
      this.dataService.getShoppingListProducts(shoppingList.shoppingListId);
    });

    this.ShoppingListProductArray$ = this.ShoppingListProductState.select(
      fromRoot.GetShoppingListProducts
    );
    this.pageInfo$ = this.ProductState.select(fromRoot.GetPageInfo);

    this.ShoppingListProductArray$.subscribe((array) => {
      this.Total = 0;
      array.forEach((element) => {
        this.Total =
          this.Total + element.productQuantity * element.product.currentPrice;
      });
    });

    // var callback = function () {
    //   // Handler when the DOM is fully loaded
    //   debugger;
    //   this.ShoppingListProductArray$.subscribe((array) => {
    //     console.log(array);
    //     if (array.length != undefined) {
    //       array.forEach((element) => {
    //         if (element.checked == true) {
    //           debugger;
    //           var row = document.getElementById(
    //             element.shoppingListProductId.toString()
    //           );
    //           if (row != null) {
    //             debugger;
    //             console.log("Row has a value");
    //             row.style.backgroundColor = "darkgray";
    //           }
    //         } //End of inner If
    //       });
    //     } //End of outer if
    //   }); //End of subscription
    // };

    // if (
    //   document.readyState === "complete" ||
    //   (document.readyState !== "loading" && !document.documentElement.scroll)
    // ) {
    //   callback();
    // } else {
    //   document.addEventListener("DOMContentLoaded", callback);
    // }
  } //ngOnInit

  ngAfterViewChecked() {
    this.ShoppingListProductArray$.subscribe((array) => {
      //console.log(array);
      if (array.length != undefined) {
        array.forEach((element) => {
          if (element.checked == true) {
            var row = document.getElementById(
              "ShoppingListProduct" + element.shoppingListProductId.toString()
            );
            if (row != null) {
              //debugger;
              //console.log("Row has a value");
              row.style.removeProperty("background-color");
              row.style.backgroundColor = "#3880ff";
            }
          } //End of inner If
        });
      } //End of outer if
    }); //End of subscription
  }

  CheckboxChange(id: number) {
    console.log(id);
    var CheckBox = document.getElementById("CheckBox" + id) as HTMLInputElement;
    var row = document.getElementById("ShoppingListProduct" + id.toString());
    if (CheckBox.checked == true) {
      row.style.removeProperty("background-color");
      row.style.backgroundColor = "#3880ff";

      this.ShoppingListProductArray$.pipe(take(1)).subscribe((array) => {
        let newObj = JSON.parse(
          JSON.stringify(array.find((a) => a.shoppingListProductId == id))
        );
        newObj.checked = true;
        this.dataService.UpdateShoppingListProduct(newObj, id);
      });

      //CheckBox.checked = false;
    } else {
      row.style.removeProperty("background-color");
      row.style.backgroundColor = "#cdcdcd";
      this.ShoppingListProductArray$.pipe(take(1)).subscribe((array) => {
        let newObj = JSON.parse(
          JSON.stringify(array.find((a) => a.shoppingListProductId == id))
        );
        newObj.checked = false;
        this.dataService.UpdateShoppingListProduct(newObj, id);
      });
    }
  }

  QuantityChange(event: any, id: number) {
    var newQuantity = event.target.value;
    if (newQuantity == "") {
      newQuantity = 0;
    }
    this.ShoppingListProductArray$.pipe(take(1)).subscribe((array) => {
      let newObj = JSON.parse(
        JSON.stringify(array.find((a) => a.shoppingListProductId == id))
      );
      newObj.productQuantity = newQuantity;
      this.dataService.UpdateShoppingListProduct(newObj, id);
    });
  }

  Search(event: any) {
    //this.SearchString = event.target.value;
    if (event.target.value != "") {
      this.ShowList = false;
      var pageInfo = new PageInfo();
      pageInfo.pageNumber = 1;
      pageInfo.pageSize = 7;
      this.dataService.SearchProducts(event.target.value, pageInfo);
    } else {
      this.ShowList = true;
    }
  } // Search Method

  LoadMore(event) {
    this.ProductState.dispatch(new ProductActions.AddPageNumber());
    this.pageInfo$.pipe(take(1)).subscribe((pageInfo) => {
      this.dataService.InfiniteProducts(this.SearchString.value, pageInfo);
      if (pageInfo.pageNumber == pageInfo.totalPages) {
        event.target.disabled = true;
      }
    });
  }

  AddToShoppingList(id: number) {
    var shoppingListProduct = new ShoppingListProductModel();
    this.ActiveShoppingList$.pipe(take(1)).subscribe((shoppingList) => {
      shoppingListProduct.shoppingListId = shoppingList.shoppingListId;
      shoppingListProduct.productId = id;
      shoppingListProduct.productQuantity = 1;
      this.dataService.AddShoppingListProducts(shoppingListProduct);
    });
    this.ShowList = true;
    this.SearchString.setValue("");
  }

  DeleteShoppingListProduct(id: number) {
    this.PresentAlert(id);
  }

  async PresentAlert(id: number) {
    const alert = await this.alertController.create({
      header: "Warning",
      subHeader: "About to delete item",
      message: "Are you sure you want to delete this?",
      buttons: [
        {
          text: "Yes Please",
          handler: () => {
            this.dataService.DeleteShoppingListProduct(id);
          }, //Handler for yes please
        },

        "Oh No!",
      ], //Buttons
    });

    await alert.present();
  } //Present Alert

  transform(image: string) {
    if (image) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        "data:image;base64," + image
      );
    } else {
      return "../../../../assets/NoImage.jpg";
    }
  }
} // export
