import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { PopoverController } from "@ionic/angular";

import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { Store } from "@ngrx/store";

import { MainStoreModel } from "../../Models/MainStore/main-store-model";
import { StoreModel } from "../../Models/Store/store-model";
import { ShoppingListModel } from "../../Models/ShoppingList/shopping-list-model";

import * as fromStore from "../../Reducers/Store/Store.reducer";
import * as StoreActions from "../../Reducers/Store/Store.actions";
import * as fromShoppingList from "../../Reducers/ShoppingList/ShoppingList.reducer";
import * as ShoppingListActions from "../../Reducers/ShoppingList/ShoppingList.actions";

import * as fromRoot from "../../app.reducer";
import * as fromMainStore from "../../Reducers/MainStore/MainStore.reducer";
import * as MainStoreActions from "../../Reducers/MainStore/MainStore.actions";

@Component({
  selector: "app-popover",
  templateUrl: "./popover.page.html",
  styleUrls: ["./popover.page.scss"],
})
export class PopoverPage implements OnInit, OnDestroy {
  @Input() Mode: string;
  @Input() Name: string;
  ActiveMainStore$: Observable<MainStoreModel>;

  ActiveStore$: Observable<StoreModel>;
  MainStoreName: string;

  ActiveShoppingList$: Observable<ShoppingListModel>;
  constructor(
    private popover: PopoverController,
    private MainStoreState: Store<fromMainStore.MainStoreState>,
    private StoreState: Store<fromStore.StoreState>,
    private ShoppingListState: Store<fromShoppingList.ShoppingListState>
  ) {}

  ngOnInit() {
    if (this.Mode == "MainStore") {
      this.ActiveMainStore$ = this.MainStoreState.select(
        fromRoot.GetActiveMainStore
      );
    } // If Main Store is Passed

    if (this.Mode == "Store") {
      this.ActiveStore$ = this.StoreState.select(fromRoot.GetActiveStore);
      this.ActiveMainStore$ = this.MainStoreState.select(
        fromRoot.GetActiveMainStore
      );

      this.ActiveMainStore$.pipe(take(1)).subscribe((mainStore) => {
        this.MainStoreName = mainStore.mainStoreName;
      });
    } // If Store is Passed

    if (this.Mode == "ShoppingList") {
      this.ActiveShoppingList$ = this.ShoppingListState.select(
        fromRoot.GetActiveShoppingList
      );
      this.ActiveStore$ = this.StoreState.select(fromRoot.GetActiveStore);
      this.ActiveMainStore$ = this.MainStoreState.select(
        fromRoot.GetActiveMainStore
      );
    } // If Shopping List is Passed
  } // ngOnInit

  ClosePopOver() {
    this.popover.dismiss();
  } // ClosePopOver

  ngOnDestroy(): void {
    if (this.Mode == "MainStore") {
      this.MainStoreState.dispatch(
        new MainStoreActions.RemoveActiveMainStore()
      );
    }
    if (this.Mode == "Store") {
      this.StoreState.dispatch(new StoreActions.RemoveActiveStore());
      // this.MainStoreState.dispatch(
      //   new MainStoreActions.RemoveActiveMainStore()
      // );
    }
    if (this.Mode == "ShoppingList") {
      this.ShoppingListState.dispatch(
        new ShoppingListActions.RemoveActiveShoppingList()
      );
    }
  } // ngOnDestroy
}
