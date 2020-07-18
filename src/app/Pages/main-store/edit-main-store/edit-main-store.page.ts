import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { DataService } from "src/app/Services/data.service";
import { StateService } from "src/app/Services/state.service";
import { EventEmitterService } from 'src/app/Services/event-emitter.service';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

import { MainStoreModel } from '../../../Models/MainStore/main-store-model';

@Component({
  selector: 'app-edit-main-store',
  templateUrl: './edit-main-store.page.html',
  styleUrls: ['./edit-main-store.page.scss'],
})
export class EditMainStorePage implements OnInit {

  EditMainStoreForm: FormGroup;
  private ErrorMessage: string;
  public message: string;

  CurrentMainStore: MainStoreModel;

  constructor(
    private dataService: DataService,
    private stateService: StateService,
    private router: Router,
    private formBuilder: FormBuilder,
    private eventEmitterService: EventEmitterService,
    private route: ActivatedRoute,
  ) {

  }// Constructor

  ngOnInit() {

    this.CurrentMainStore = this.stateService.CurrentMainStore;
    this.stateService.CurrentMainStore = undefined;

    this.EditMainStoreForm = this.formBuilder.group({
      mainStoreId: [this.CurrentMainStore.mainStoreId],
      mainStoreName: [this.CurrentMainStore.mainStoreName, Validators.required],
    });

    //console.log(this.CurrentMainStore.mainStoreName);

  }//ngOnInit

  EditMainStore(EditMainStoreForm: FormGroup) {

    const MainStore = EditMainStoreForm.value;
    this.dataService.UpdateMainStore(MainStore, this.CurrentMainStore.mainStoreId).subscribe(() => {

      this.message = this.CurrentMainStore.mainStoreName + ' has been updated successfully';
      this.eventEmitterService.OnCreateMainStore({ option: 'onSubmitMainStore', value: 'Add component' });
      this.router.navigate(['']);

    })// Update Main Store Subscription

  }// Edit main store


}// Export
