import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "src/app/Services/data.service";
import { DomSanitizer } from "@angular/platform-browser";

import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
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
  MainStoreArray$: Observable<MainStoreModel[]>;

  constructor(
    private dataService: DataService,
    private router: Router,
    // public modalController: ModalController,
    private alertController: AlertController,
    private popover: PopoverController,
    private sanitizer: DomSanitizer,
    private store: Store<fromMainStore.MainStoreState>
  ) {
    //this.GetAllMainStore();
  } // COnstructor

  ngOnInit() {
    this.MainStoreArray$ = this.store.select(fromRoot.GetMainStores);
    this.GetMainStores();
  } //ng On Init

  GetMainStores() {
    this.dataService.GetAllMainStores();
  } // Get all the main Stores

  ViewMainStoreDetails(id: number) {
    this.CreatePopOver(id);
  }

  ViewStores(id: Number) {
    this.OpenMainStore(id);
  } // View Stores

  CreateMainStore() {
    this.router.navigate(["/create-main-store"]);
  } // Create Main Store

  UpdateMainStore(id: Number) {
    this.EditMainStore(id);
  }

  transform(image: string) {
    if (image) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        "data:image;base64," + image
      );
    } else {
      return "../../../assets/NoImage.jpg";
    }
  }

  CreatePopOver(id: any) {
    this.MainStoreArray$.pipe(take(1)).subscribe((array) => {
      var MainStore: MainStoreModel = array.find((a) => a.mainStoreId == id);
      this.store.dispatch(new MainStoreActions.SetActiveMainStore(MainStore));

      this.popover
        .create({
          component: PopoverPage,
          showBackdrop: true,
          componentProps: {
            Mode: "MainStore",
            Name: MainStore.mainStoreName,
          },
        })
        .then((popoverElement) => {
          popoverElement.present();
        });
    });
  } // Create popover

  async PresentAlert(id) {
    const alert = await this.alertController.create({
      header: "Warning",
      subHeader: "About to delete something",
      message: "Are you sure you want to delete this?",
      buttons: [
        {
          text: "Yes Please",
          handler: () => {
            this.MainStoreArray$.pipe(take(1)).subscribe((data) => {
              const position = data.findIndex((d) => d.mainStoreId === id);
              this.dataService.DeleteMainStore(id, position);
            });
          }, //Handler for yes please
        },

        "Oh No!",
      ], //Buttons
    });

    await alert.present();
  } //Present Alert

  EditMainStore(id: Number) {
    this.MainStoreArray$.pipe(take(1)).subscribe((mainStore) => {
      mainStore.forEach((element) => {
        if (element.mainStoreId == id) {
          this.store.dispatch(new MainStoreActions.SetActiveMainStore(element));
        }
      });
    });
    this.router.navigate(["/edit-main-store"]);
  } // Edit Main Store

  OpenMainStore(id: Number) {
    this.MainStoreArray$.pipe(take(1)).subscribe((array) => {
      var CurrentMainStore = array.find((msa) => msa.mainStoreId == id);
      this.store.dispatch(
        new MainStoreActions.SetActiveMainStore(CurrentMainStore)
      );
      this.router.navigate(["/store"]);
    });
  }
} // Export
