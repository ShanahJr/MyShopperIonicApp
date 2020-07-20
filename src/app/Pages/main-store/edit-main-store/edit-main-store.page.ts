import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { DataService } from "src/app/Services/data.service";
import { StateService } from "src/app/Services/state.service";
import { EventEmitterService } from "src/app/Services/event-emitter.service";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

import * as fromRoot from "../../../app.reducer";
import * as fromMainStore from "../../../Reducers/MainStore/MainStore.reducer";
import * as MainStoreActions from "../../../Reducers/MainStore/MainStore.actions";

import { MainStoreModel } from "../../../Models/MainStore/main-store-model";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";

@Component({
  selector: "app-edit-main-store",
  templateUrl: "./edit-main-store.page.html",
  styleUrls: ["./edit-main-store.page.scss"],
})
export class EditMainStorePage implements OnInit {
  EditMainStoreForm: FormGroup;
  private ErrorMessage: string;
  public message: string;

  ActiveMainStore$: Observable<MainStoreModel>;

  constructor(
    private dataService: DataService,
    private stateService: StateService,
    private router: Router,
    private formBuilder: FormBuilder,
    private eventEmitterService: EventEmitterService,
    private route: ActivatedRoute,
    private store: Store<fromMainStore.MainStoreState>
  ) {} // Constructor

  ngOnInit() {
    this.ActiveMainStore$ = this.store
      .select(fromRoot.GetActiveMainStore)
      .pipe(take(1));
    //this.ActiveMainStore = this.store.select(fromRoot.GetActiveMainStore);

    this.ActiveMainStore$.pipe(take(1)).subscribe((store) => {
      this.EditMainStoreForm = this.formBuilder.group({
        mainStoreId: [store.mainStoreId],
        mainStoreName: [store.mainStoreName, Validators.required],
      });

      console.log(store);
    });

    //console.log(this.CurrentMainStore.mainStoreName);
  } //ngOnInit

  EditMainStore(EditMainStoreForm: FormGroup) {
    const store: MainStoreModel = EditMainStoreForm.value;

    this.dataService.UpdateMainStore(store, store.mainStoreId);
    this.router.navigate([""]);

    // this.ActiveMainStore$.subscribe( (store) => {

    //   if (store.mainStoreId == MainStore.mainStoreId) {

    //   }

    //   this.dataService.UpdateMainStore(store, store.mainStoreId);

    // });
  } // Edit main store
} // Export
