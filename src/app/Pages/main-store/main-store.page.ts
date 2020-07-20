import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EventEmitterService } from "../../Services/event-emitter.service";
import { DataService } from "src/app/Services/data.service";
import { StateService } from "src/app/Services/state.service";
import { Subscription } from "rxjs";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Store } from "@ngrx/store";

import * as fromRoot from "../../app.reducer";
import * as fromMainStore from "../../Reducers/MainStore/MainStore.reducer";
import * as MainStoreActions from "../../Reducers/MainStore/MainStore.actions";

// import { ModalController } from '@ionic/angular';
import { PopoverController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";

import { MainStoreModel } from "../../Models/MainStore/main-store-model";
import { PopoverPage } from "../../Components/popover/popover.page";

@Component({
  selector: "app-main-store",
  templateUrl: "./main-store.page.html",
  styleUrls: ["./main-store.page.scss"],
})
export class MainStorePage implements OnInit {
  private subscription: Subscription;
  MainStoreArray$: Observable<MainStoreModel[]>;

  constructor(
    private dataService: DataService,
    private stateService: StateService,
    private router: Router,
    // public modalController: ModalController,
    private eventEmitterService: EventEmitterService,
    private alertController: AlertController,
    private popover: PopoverController,

    private store: Store<fromMainStore.MainStoreState>
  ) {
    //this.GetAllMainStore();
  } // COnstructor

  ngOnInit() {
    this.MainStoreArray$ = this.store.select(fromRoot.GetMainStores);
    this.GetMainStores();

    this.subscription = this.eventEmitterService.notifyObservable$.subscribe(
      (res) => {
        if (
          res.hasOwnProperty("option") &&
          res.option === "onSubmitMainStore"
        ) {
          console.log(res.value, "called once");
          // perform your other action from here
          //this.GetAllMainStore();
        }
      }
    );
  } //ng On Init

  GetMainStores() {
    this.dataService.GetAllMainStores();
  } // Get all the main Stores

  ViewStores(id: Number) {
    this.OpenMainStore(id);
  } // View Stores

  CreateMainStore() {
    this.router.navigate(["/create-main-store"]);
  } // Create Main Store

  UpdateMainStore(id: number) {
    this.EditMainStore(id);
  }

  // CreatePopOver() {

  //   this.popover.create({ component: PopoverPage, showBackdrop: false }).then((popoverElement) => {
  //     popoverElement.present();
  //   })

  // }// Create popover

  async PresentAlert(id: Number) {
    const alert = await this.alertController.create({
      header: "Warning",
      subHeader: "About to delete something",
      message: "Are you sure you want to delete this?",
      buttons: [
        {
          text: "Yes Please",
          handler: () => {
            this.MainStoreArray$.subscribe((data) => {
              const position = data.findIndex((d) => d.mainStoreId === id);
              this.dataService.DeleteMainStore(id, position);
            }).unsubscribe();
          }, //Handler for yes please
        },

        "Oh No!",
      ], //Buttons
    });

    await alert.present();
  } //Present Alert

  EditMainStore(id: Number) {
    this.MainStoreArray$.subscribe((mainStore) => {
      mainStore.forEach((element) => {
        if (element.mainStoreId == id) {
          this.store.dispatch(new MainStoreActions.SetActiveMainStore(element));
        }
        this.router.navigate(["/edit-main-store"]);
      });
    });
  } // Edit Main Store

  // async GetAllMainStore() {

  //   // this.dataService.GetAllMainStores().subscribe((data) => {

  //   //   this.MainStoreArray = data;
  //   //   //console.log(this.MainStoreArray)

  //   // })

  //   this.MainStoreArray = await this.dataService.GetAllMainStore();
  //   console.log(this.MainStoreArray);

  // }// get Main Store

  OpenMainStore(id: Number) {
    this.MainStoreArray$.subscribe((array) => {
      var CurrentMainStore = array.find((msa) => msa.mainStoreId == id);
      this.store.dispatch(
        new MainStoreActions.SetActiveMainStore(CurrentMainStore)
      );
      this.router.navigate(["/store"]);
    });
  }
} // Export
