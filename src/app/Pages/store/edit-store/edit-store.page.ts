import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { DataService } from "src/app/Services/data.service";
import { StateService } from "src/app/Services/state.service";
import { EventEmitterService } from 'src/app/Services/event-emitter.service';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

import { MainStoreModel } from '../../../Models/MainStore/main-store-model';
import {MainStoreStoreModel} from '../../../Models/MainStoreStore/main-store-store-model';
import { StoreModel } from '../../../Models/Store/store-model';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.page.html',
  styleUrls: ['./edit-store.page.scss'],
})
export class EditStorePage implements OnInit {

  EditStoreForm: FormGroup;
  private ErrorMessage: string;
  public message: string;

  CurrentStore: StoreModel;
  CurrentMainStore: MainStoreModel = null;
  MainStoreArray: MainStoreModel[];

  compareWith : any ;
  //SelectedMainStore : Number;

  constructor(
    private dataService: DataService,
    private stateService: StateService,
    private router: Router,
    private formBuilder: FormBuilder,
    private eventEmitterService: EventEmitterService,
    private route: ActivatedRoute,

  ) {

  }// Constructor

  async ngOnInit() {
    //await this.GetAllMainStore();
    this.MainStoreArray = await this.dataService.GetAllMainStore();

    this.CurrentStore = this.stateService.CurrentStore;
    //this.SelectedMainStore = this.CurrentMainStore.mainStoreId;
    this.stateService.CurrentStore = undefined;
    console.log(this.CurrentStore);

    this.EditStoreForm = this.formBuilder.group({
      storeId: [this.CurrentStore.storeId],
      storeName: [this.CurrentStore.storeName, Validators.required],
      storeLocation: [this.CurrentStore.storeLocation],
      storeRating: [this.CurrentStore.storeRating],
      mainStoreId: [this.CurrentStore.mainStoreId]
    });

    this.compareWith = this.compareWithFn;

  }//ngOnInit

  async GetAllMainStore() {

    // this.dataService.GetAllMainStores().subscribe((data) => {

    //   this.MainStoreArray = data;

    // });

    this.MainStoreArray = await this.dataService.GetAllMainStore();

  }// get Main Store

  // compareFn(e1: MainStoreModel, e2: MainStoreModel): boolean {
  //   return e1 && e2 ? e1.mainStoreId == e2.mainStoreId : e1 == e2;
  // }

  EditStore(EditStoreForm: FormGroup) {

    const Store = EditStoreForm.value;
    this.dataService.UpdateStore(Store, this.CurrentStore.storeId).subscribe(() => {

      this.message = this.CurrentStore.storeName + ' has been updated successfully';

      // if (this.SelectedMainStore != this.CurrentMainStore.mainStoreId) {
        
      //   this.stateService.ChangedStoreID = this.CurrentStore.storeId;
      //   this.eventEmitterService.OnCreateStore({ option: 'onEditStore', value: 'Add component' });

      // }

      // this.eventEmitterService.OnCreateStore({ option: 'onSubmitStore', value: 'Add component' });

      // var ChangeMainStoreStore = new MainStoreStoreModel;
      // ChangeMainStoreStore.mainStoreId = this.SelectedMainStore;
      // ChangeMainStoreStore.storeId = this.CurrentStore.storeId;

      // this.dataService.UpdateStore( ChangeMainStoreStore , this.CurrentMainStore.mainStoreId ).subscribe( ( data ) => {

      //   console.log(data);

      // });

      this.router.navigate(['/store']);

    })// Update Store Subscription

    //console.log(this.SelectedMainStore);

  }// Edit store

compareWithFn(o1, o2) {
  return o1 === o2;
};

}// Export
