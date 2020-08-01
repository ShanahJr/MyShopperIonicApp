import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "src/app/Services/data.service";

import { Observable } from "rxjs";
import { map, take, takeUntil } from "rxjs/operators";
import { Store } from "@ngrx/store";

import * as fromRoot from "../../../app.reducer";
import * as fromProduct from "../../../Reducers/Product/Product.reducer";
import * as ProductActions from "../../../Reducers/Product/Product.actions";
import * as fromShoppingList from "../../../Reducers/ShoppingList/ShoppingList.reducer";
import * as ShoppingListActions from "../../../Reducers/ShoppingList/ShoppingList.actions";

// import { ModalController } from '@ionic/angular';
import { PopoverController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";

import { ShoppingListModel } from "../../../Models/ShoppingList/shopping-list-model";
import { StoreModel } from "../../../Models/Store/store-model";
import { PopoverPage } from "../../../Components/popover/popover.page";
@Component({
  selector: "app-shopping-list-products",
  templateUrl: "./shopping-list-products.page.html",
  styleUrls: ["./shopping-list-products.page.scss"],
})
export class ShoppingListProductsPage implements OnInit {
  constructor(
    private dataService: DataService,
    private router: Router,
    // public modalController: ModalController,
    private alertController: AlertController,
    private popover: PopoverController,
    private ProductState: Store<fromProduct.ProductState>,
    private ShoppingListState: Store<fromShoppingList.ShoppingListState>
  ) {}

  ngOnInit() {}
}
