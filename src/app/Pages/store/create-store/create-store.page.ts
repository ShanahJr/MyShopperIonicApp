import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DataService } from "src/app/Services/data.service";
import { StateService } from "src/app/Services/state.service";
import { EventEmitterService } from 'src/app/Services/event-emitter.service';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { MainStoreModel } from 'src/app/Models/MainStore/main-store-model';
import { MainStoreStoreModel } from 'src/app/Models/MainStoreStore/main-store-store-model';

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.page.html',
  styleUrls: ['./create-store.page.scss'],
})
export class CreateStorePage implements OnInit {

  private CreateStoreForm: FormGroup;
  private CurrentMainStore: MainStoreModel;
  private ErrorMessage: string;
  public message: string;

  constructor(
    private dataService: DataService,
    private stateService: StateService,
    private router: Router,
    private formBuilder: FormBuilder,
    private eventEmitterService: EventEmitterService
  ) {

    this.CreateStoreForm = this.formBuilder.group({
      storeName: ["", Validators.required],
      storeLocation: [""],
      storeRating: ["", Validators.pattern("^[0-9]*$")]

    });

  }// Constructor

  ngOnInit() {

    this.CurrentMainStore = this.stateService.CurrentMainStore;
    this.stateService.CurrentMainStore = undefined;

  }//ngOnInit

  CreateStore(StoreForm: FormGroup) {

    const Store = StoreForm.value;

    this.dataService.AddStore(Store, this.CurrentMainStore.mainStoreId).subscribe(() => {

      this.message = 'MainStore has been saved successfully';

      // this.CreateAnimeForm.reset();
      this.eventEmitterService.OnCreateStore({ option: 'onSubmitStore', value: 'Add component' });
      this.router.navigate(["/store"]);

      // this.events.publish('functionCall:LoadAnimeData');
      //this.eventEmitterService.CallGetAnime;

    })

  }// Create MainStore

}// Export
