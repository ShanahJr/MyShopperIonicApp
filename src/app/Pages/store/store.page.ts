import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "src/app/Services/data.service";

import { Observable } from "rxjs";
import { map, take, takeUntil } from "rxjs/operators";
import { Store } from "@ngrx/store";

import * as fromRoot from "../../app.reducer";
import * as fromStore from "../../Reducers/Store/Store.reducer";
import * as StoreActions from "../../Reducers/Store/Store.actions";
import * as fromMainStore from "../../Reducers/MainStore/MainStore.reducer";
import * as MainStoreActions from "../../Reducers/MainStore/MainStore.actions";

// import { ModalController } from '@ionic/angular';
import { PopoverController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";

import { MainStoreModel } from "../../Models/MainStore/main-store-model";
import { StoreModel } from "../../Models/Store/store-model";
import { PopoverPage } from "../../Components/popover/popover.page";

@Component({
  selector: "app-store",
  templateUrl: "./store.page.html",
  styleUrls: ["./store.page.scss"],
})
export class StorePage implements OnInit, OnDestroy {
  ActiveMainStore$: Observable<MainStoreModel>;
  StoreArray$: Observable<StoreModel[]>;
  //MainStoreArray: MainStoreModel[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    // public modalController: ModalController,
    private alertController: AlertController,
    private popover: PopoverController,
    private MainStoreState: Store<fromMainStore.MainStoreState>,
    private StoreState: Store<fromStore.StoreState>
  ) {} // Constructor

  ngOnInit() {
    this.ActiveMainStore$ = this.MainStoreState.select(
      fromRoot.GetActiveMainStore
    );
    this.StoreArray$ = this.StoreState.select(fromRoot.GetStores);

    this.GetStores();
  } // ngOnInit

  GetStores() {
    this.ActiveMainStore$.pipe(take(1)).subscribe((store) => {
      this.dataService.GetStores(store.mainStoreId);
    });
  } // Get all Stores Associated to the seletected main store

  ViewStoreDetails(id: number) {
    this.CreatePopOver(id);
  }

  CreateStore() {
    this.router.navigate(["/store/create-store"]);
  } // Create  Store

  EditStore(id: Number) {
    this.StoreArray$.pipe(take(1)).subscribe((array) => {
      // var CurrentStore = array.find((sa) => sa.storeId == id);
      // this.StoreState.dispatch(new StoreActions.SetActiveStore(CurrentStore));

      array.forEach((element) => {
        if (element.storeId == id) {
          this.StoreState.dispatch(new StoreActions.SetActiveStore(element));
        }
      });

      this.router.navigate(["/store/edit-store"]);
    });
  } // Edit Main Store

  DeleteStore(id: number) {
    var StoreName: string;
    this.StoreArray$.pipe(take(1)).subscribe((array) => {
      StoreName = array.find((a) => a.storeId == id).storeName;
      this.PresentAlert(id, StoreName);
    });
  } // Delete Store

  OpenStore(id: Number) {
    this.StoreArray$.pipe(take(1)).subscribe((array) => {
      var Store: StoreModel = array.find((a) => a.storeId == id);
      this.StoreState.dispatch(new StoreActions.SetActiveStore(Store));
    });
    this.router.navigate(["/shopping-list"]);
  } // Open Store

  CreatePopOver(id: any) {
    this.StoreArray$.pipe(take(1)).subscribe((array) => {
      var Store: StoreModel = array.find((a) => a.storeId == id);
      this.StoreState.dispatch(new StoreActions.SetActiveStore(Store));

      this.popover
        .create({
          component: PopoverPage,
          showBackdrop: true,
          componentProps: {
            Mode: "Store",
            Name: Store.storeName,
          },
        })
        .then((popoverElement) => {
          popoverElement.present();
        });
    });
  } // Create popover

  async PresentAlert(id: number, StoreName: string) {
    const alert = await this.alertController.create({
      header: "Warning",
      subHeader: "About to delete " + StoreName,
      message: "Are you sure you want to delete this?",
      buttons: [
        {
          text: "Yes Please",
          handler: () => {
            this.StoreArray$.pipe(take(1)).subscribe((array) => {
              this.dataService.DeleteStore(id);
            });
          }, //Handler for yes please
        },

        "Oh No!",
      ], //Buttons
    });

    await alert.present();
  } //Present Alert

  ngOnDestroy() {
    this.MainStoreState.dispatch(new MainStoreActions.RemoveActiveMainStore());
    this.StoreState.dispatch(new StoreActions.RemoveActiveStore());
  } // ngOnDestroy
} // Export
