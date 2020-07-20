import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { EventEmitterService } from '../../Services/event-emitter.service';
import { DataService } from "src/app/Services/data.service";
import { StateService } from "src/app/Services/state.service";
import { Subscription } from 'rxjs';

// import { ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { MainStoreModel } from '../../Models/MainStore/main-store-model';
import { StoreModel } from '../../Models/Store/store-model';
import { PopoverPage } from '../../Components/popover/popover.page';


@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  private subscription: Subscription;
  CurrentMainStore: MainStoreModel = null;
  StoreArray: StoreModel[] = [];
  //MainStoreArray: MainStoreModel[] = [];

  constructor(
    private dataService: DataService,
    private stateService: StateService,
    private router: Router,
    // public modalController: ModalController,
    private eventEmitterService: EventEmitterService,
    private alertController: AlertController,
    private popover: PopoverController
  ) {
    
    this.CurrentMainStore = this.stateService.CurrentMainStore;
    this.GetStores(this.CurrentMainStore.mainStoreId);
    this.stateService.CurrentMainStore = undefined;

    this.subscription = this.eventEmitterService.notifyObservable$.subscribe((res) => {

      if (res.hasOwnProperty('option') && res.option === 'onSubmitStore') {
        console.log(res.value, 'called once in Store Page');
        // perform your other action from here
        this.GetStores(this.CurrentMainStore.mainStoreId);
      }// If user is adding a store

      // This function is only called if the MainStore value is changed
      if (res.hasOwnProperty('option') && res.option === 'onEditStore') {
        debugger;
        //console.log(res.value, ' Main store has been changed');
        // perform your other action from here

        var id = this.stateService.ChangedStoreID;
        console.log( 'ID in the state service is ' + id );
        
        for (let i = 0; i < this.StoreArray.length; i++) {

          const element = this.StoreArray[i];
          if (element.storeId == id) {
            this.StoreArray.splice(i,1);
          }
          
        };

      }// If User is editing a store and changed the main store value

      this.subscription.unsubscribe();

    });// End of Event Emitter Subscription

   }// Constructor

  ngOnInit() {



    //console.log(this.StoreArray);

    // this.subscription = this.eventEmitterService.notifyObservable$.subscribe((res) => {
    //   if (res.hasOwnProperty('option') && res.option === 'onSubmitStore') {
    //     console.log(res.value, 'called once');
    //     // perform your other action from here
    //     this.GetStores(this.CurrentMainStore.mainStoreId);
    //   }
    // });

  }// ngOnInit

  GetStores(id: Number) {

    this.StoreArray = [];

    this.dataService.GetStores(id).subscribe((data) => {

      this.StoreArray = data;

    })

  }// Get all associated stores

  // GetMainStores() {
  //   this.dataService.GetAllMainStores().subscribe((data) => {
  //     //this.MainStoreArray = data;
  //     this.stateService.MainStoreArray = data;
  //   });

  // }// Get Main Stores

  CreateStore() {
    this.stateService.CurrentMainStore = this.CurrentMainStore;
    this.router.navigate(['/store/create-store']);
  }// Create  Store

  EditStore(id: Number) {

    //this.GetMainStores()

    //this.sleep(5000);

    var CurrentStore = this.StoreArray.find(sa => sa.storeId == id);
    this.stateService.CurrentStore = CurrentStore;
    //this.stateService.CurrentMainStore = this.CurrentMainStore;
    this.router.navigate(['/store/edit-store'])

  }// Edit Main Store

  DeleteStore( id : Number ){

    this.PresentAlert(id);

  }// Delete Store

  OpenStore(id: Number) {

    this.stateService.MainStoreID = id;
    this.router.navigate(['/store']);

  }// Open Store

  async PresentAlert(id: Number) {

    var CurrentStore = this.StoreArray.find( sa => sa.storeId == id);
    const alert = await this.alertController.create({

      header: 'Warning',
      subHeader: 'About to delete ' + CurrentStore.storeName,
      message: 'Are you sure you want to delete this?',
      buttons: [
        {
          text: 'Yes Please',
          handler: () => {

            this.dataService.DeleteStore(id).subscribe(() => {

              this.StoreArray = [];
              this.GetStores(this.CurrentMainStore.mainStoreId);

            })

          }//Handler for yes please
        },

        'Oh No!'

      ]//Buttons
    });

    await alert.present();


  };//Present Alert

}// Export

  // sleep(milliseconds) {
  //   const date = Date.now();
  //   let currentDate = null;
  //   do {
  //     currentDate = Date.now();
  //   } while (currentDate - date < milliseconds);
  // }
