import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "src/app/Services/data.service";
import { StateService } from "src/app/Services/state.service";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { MainStoreModel } from "src/app/Models/MainStore/main-store-model";

import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { Store } from "@ngrx/store";

import * as fromRoot from "../../../app.reducer";
import * as fromStore from "../../../Reducers/Store/Store.reducer";
import * as fromMainStore from "../../../Reducers/MainStore/MainStore.reducer";

@Component({
  selector: "app-create-store",
  templateUrl: "./create-store.page.html",
  styleUrls: ["./create-store.page.scss"],
})
export class CreateStorePage implements OnInit {
  private CreateStoreForm: FormGroup;
  private ActiveMainStore$: Observable<MainStoreModel>;

  constructor(
    private dataService: DataService,
    private stateService: StateService,
    private router: Router,
    private formBuilder: FormBuilder,
    private MainStoreState: Store<fromMainStore.MainStoreState>,
    private StoreState: Store<fromStore.StoreState>
  ) {} // Constructor

  ngOnInit() {
    this.ActiveMainStore$ = this.MainStoreState.select(
      fromRoot.GetActiveMainStore
    );

    this.ActiveMainStore$.pipe(take(1)).subscribe((mainStore) => {
      console.log(mainStore);
      this.CreateStoreForm = this.formBuilder.group({
        storeName: ["", Validators.required],
        storeLocation: [""],
        storeRating: ["", Validators.pattern("^[0-9]*$")],
        mainStoreId: [mainStore.mainStoreId],
      });
    });
  } //ngOnInit

  CreateStore(StoreForm: FormGroup) {
    const Store = StoreForm.value;
    this.dataService.AddStore(Store);
    this.router.navigate(["/store"]);
  } // Create Store

  // }// Create MainStore
} // Export
