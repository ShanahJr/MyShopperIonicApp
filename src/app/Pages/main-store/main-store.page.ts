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
import { PopoverPage } from '../../Components/popover/popover.page';

@Component({
  selector: 'app-main-store',
  templateUrl: './main-store.page.html',
  styleUrls: ['./main-store.page.scss'],
})
export class MainStorePage implements OnInit {

  private subscription: Subscription;
  MainStoreArray: MainStoreModel[] = [];

  constructor(
    private dataService: DataService,
    private stateService: StateService,
    private router: Router,
    // public modalController: ModalController,
    private eventEmitterService: EventEmitterService,
    private alertController: AlertController,
    private popover: PopoverController
  ) {

    this.GetAllMainStore();

  }// COnstructor

  CreatePopOver() {

    this.popover.create({ component: PopoverPage, showBackdrop: false }).then((popoverElement) => {
      popoverElement.present();
    })

  }// Create popover

  async PresentAlert(id: Number) {

    const alert = await this.alertController.create({

      header: 'Warning',
      subHeader: 'About to delete something',
      message: 'Are you sure you want to delete this?',
      buttons: [
        {
          text: 'Yes Please',
          handler: () => {

            this.dataService.DeleteMainStore(id).subscribe(() => {

              this.MainStoreArray = [];
              this.GetAllMainStore()

            })

          }//Handler for yes please
        },

        'Oh No!'

      ]//Buttons
    });

    await alert.present();


  };//Present Alert

  ngOnInit() {

    this.subscription = this.eventEmitterService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'onSubmitMainStore') {
        console.log(res.value, 'called once');
        // perform your other action from here
        this.GetAllMainStore();
      }
    });

  }//ng On Init

  CreateMainStore() {
    this.router.navigate(['/create-main-store']);
  }// Create Main Store

  EditMainStore(id: Number) {

    var CurrentMainStore = this.MainStoreArray.find(msa => msa.mainStoreId == id);
    this.stateService.CurrentMainStore = CurrentMainStore;
    this.router.navigate(['/edit-main-store'])

  }// Edit Main Store

  GetAllMainStore(): void {

    this.dataService.GetAllMainStores().subscribe((data) => {

      this.MainStoreArray = data;
      //console.log(this.MainStoreArray)

    })

  }// get Main Store

  OpenMainStore(id: Number) {

    var CurrentMainStore = this.MainStoreArray.find(msa => msa.mainStoreId == id);

    this.stateService.CurrentMainStore = CurrentMainStore;
    this.router.navigate(['/store']);

  }

}// Export
