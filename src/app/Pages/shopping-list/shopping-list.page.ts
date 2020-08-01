import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "src/app/Services/data.service";

import { Observable } from "rxjs";
import { map, take, takeUntil } from "rxjs/operators";
import { Store } from "@ngrx/store";

import * as fromRoot from "../../app.reducer";
import * as fromStore from "../../Reducers/Store/Store.reducer";
import * as StoreActions from "../../Reducers/Store/Store.actions";
import * as fromShoppingList from "../../Reducers/ShoppingList/ShoppingList.reducer";
import * as ShoppingListActions from "../../Reducers/ShoppingList/ShoppingList.actions";

// import { ModalController } from '@ionic/angular';
import { PopoverController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";

import { ShoppingListModel } from "../../Models/ShoppingList/shopping-list-model";
import { StoreModel } from "../../Models/Store/store-model";
import { PopoverPage } from "../../Components/popover/popover.page";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.page.html",
  styleUrls: ["./shopping-list.page.scss"],
})
export class ShoppingListPage implements OnInit {
  ActiveStore$: Observable<StoreModel>;
  ShoppingListArray$: Observable<ShoppingListModel[]>;

  constructor(
    private dataService: DataService,
    private router: Router,
    // public modalController: ModalController,
    private alertController: AlertController,
    private popover: PopoverController,
    private StoreState: Store<fromStore.StoreState>,
    private ShoppingListState: Store<fromShoppingList.ShoppingListState>
  ) {} //constructor

  ngOnInit() {
    this.ActiveStore$ = this.StoreState.select(fromRoot.GetActiveStore);
    this.ShoppingListArray$ = this.StoreState.select(fromRoot.GetShoppingLists);

    this.GetShoppingLists();
  } // ngOnInit

  GetShoppingLists() {
    this.ActiveStore$.pipe(take(1)).subscribe((store) => {
      this.dataService.GetShoppingLists(store.storeId);
    });
  } // GetShoppingLists

  OpenShoppingList(id: number) {
    this.ShoppingListArray$.pipe(take(1)).subscribe((array) => {
      var ShoppingList = array.find((sl) => sl.shoppingListId == id);
      this.ShoppingListState.dispatch(
        new ShoppingListActions.SetActiveShoppingList(ShoppingList)
      );

      this.router.navigate(["/shopping-list/shopping-list-products"]);
    });
  }

  CreateShoppingList() {
    this.router.navigate(["/shopping-list/create-shopping-list"]);
  } // Create  Store

  ViewShoppingListDetails(id: number) {
    this.CreatePopOver(id);
  }

  EditShoppingList(id: Number) {
    this.ShoppingListArray$.pipe(take(1)).subscribe((array) => {
      array.forEach((element) => {
        if (element.shoppingListId == id) {
          this.ShoppingListState.dispatch(
            new ShoppingListActions.SetActiveShoppingList(element)
          );
        }
      });

      this.router.navigate(["/shopping-list/edit-shopping-list"]);
    });
  } // Edit Main Store

  DeleteShoppingList(id: number) {
    var ShoppingListName: string;
    this.ShoppingListArray$.pipe(take(1)).subscribe((array) => {
      ShoppingListName = array.find((a) => a.shoppingListId == id)
        .shoppingListName;
      this.PresentAlert(id, ShoppingListName);
    });
  } // Delete Store

  CreatePopOver(id: any) {
    this.ShoppingListArray$.pipe(take(1)).subscribe((array) => {
      var shoppingList: ShoppingListModel = array.find(
        (a) => a.shoppingListId == id
      );
      this.ShoppingListState.dispatch(
        new ShoppingListActions.SetActiveShoppingList(shoppingList)
      );

      this.popover
        .create({
          component: PopoverPage,
          showBackdrop: true,
          componentProps: {
            Mode: "ShoppingList",
            Name: shoppingList.shoppingListName,
          },
        })
        .then((popoverElement) => {
          popoverElement.present();
        });
    });
  } // Create popover

  async PresentAlert(id: number, ShoppingListName: string) {
    const alert = await this.alertController.create({
      header: "Warning",
      subHeader: "About to delete " + ShoppingListName,
      message: "Are you sure you want to delete this?",
      buttons: [
        {
          text: "Yes Please",
          handler: () => {
            this.ShoppingListArray$.pipe(take(1)).subscribe((array) => {
              this.dataService.DeleteShoppingList(id);
            });
          }, //Handler for yes please
        },

        "Oh No!",
      ], //Buttons
    });

    await alert.present();
  } //Present Alert
} // Export
