import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { DataService } from "src/app/Services/data.service";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

import { MainStoreModel } from "../../../Models/MainStore/main-store-model";
import { MainStoreStoreModel } from "../../../Models/MainStoreStore/main-store-store-model";
import { StoreModel } from "../../../Models/Store/store-model";
import { async } from "@angular/core/testing";
import { Observable } from "rxjs";

import * as fromRoot from "../../../app.reducer";
import * as fromStore from "../../../Reducers/Store/Store.reducer";
import * as StoreActions from "../../../Reducers/Store/Store.actions";
import * as fromMainStore from "../../../Reducers/MainStore/MainStore.reducer";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";

@Component({
  selector: "app-edit-store",
  templateUrl: "./edit-store.page.html",
  styleUrls: ["./edit-store.page.scss"],
})
export class EditStorePage implements OnInit, OnDestroy {
  EditStoreForm: FormGroup;
  private ErrorMessage: string;
  public message: string;

  ActiveStore$: Observable<StoreModel>;
  ActiveMainStore$: Observable<MainStoreModel>;
  MainStoreArray$: Observable<MainStoreModel[]>;

  compareWith: any;
  //SelectedMainStore : Number;

  constructor(
    private dataService: DataService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private StoreState: Store<fromStore.StoreState>,
    private MainStoreState: Store<fromMainStore.MainStoreState>
  ) {} // Constructor

  ngOnInit() {
    this.MainStoreArray$ = this.MainStoreState.select(fromRoot.GetMainStores);
    this.ActiveStore$ = this.StoreState.select(fromRoot.GetActiveStore).pipe(
      take(1)
    );
    this.ActiveMainStore$ = this.MainStoreState.select(
      fromRoot.GetActiveMainStore
    ).pipe(take(1));

    this.ActiveStore$.pipe(take(1)).subscribe((CurrentStore) => {
      this.EditStoreForm = this.formBuilder.group({
        storeId: [CurrentStore.storeId],
        storeName: [CurrentStore.storeName, Validators.required],
        storeLocation: [CurrentStore.storeLocation],
        storeRating: [CurrentStore.storeRating],
        mainStoreId: [CurrentStore.mainStoreId],
      });
    });
  } //ngOnInit

  EditStore(EditStoreForm: FormGroup) {
    const Store: StoreModel = EditStoreForm.value;

    this.ActiveStore$.pipe(take(1)).subscribe((aStore) => {
      // If main store has changed, then pass value true so that some extra changes can be made
      // to the main State
      if (aStore.mainStoreId != Store.mainStoreId) {
        this.dataService.UpdateStore(Store, Store.storeId, true);
      } else {
        this.dataService.UpdateStore(Store, Store.storeId, false);
      }
      this.StoreState.dispatch(new StoreActions.RemoveActiveStore());
      this.router.navigate(["/store"]);
    });
  } // Edit store

  ngOnDestroy(): void {
    this.StoreState.dispatch(new StoreActions.RemoveActiveStore());
  }
} // Export
