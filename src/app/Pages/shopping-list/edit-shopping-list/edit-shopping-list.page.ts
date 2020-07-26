import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { DataService } from "src/app/Services/data.service";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

import { ShoppingListModel } from "../../../Models/ShoppingList/shopping-list-model";
import { StoreModel } from "../../../Models/Store/store-model";
import { async } from "@angular/core/testing";
import { Observable } from "rxjs";

import * as fromRoot from "../../../app.reducer";
import * as fromStore from "../../../Reducers/Store/Store.reducer";
import * as ShoppingListActions from "../../../Reducers/ShoppingList/ShoppingList.actions";
import * as fromShoppingList from "../../../Reducers/ShoppingList/ShoppingList.reducer";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";

@Component({
  selector: "app-edit-shopping-list",
  templateUrl: "./edit-shopping-list.page.html",
  styleUrls: ["./edit-shopping-list.page.scss"],
})
export class EditShoppingListPage implements OnInit {
  EditShoppingListForm: FormGroup;
  private ErrorMessage: string;

  ActiveShoppingList$: Observable<ShoppingListModel>;
  ActiveStore$: Observable<StoreModel>;
  StoreArray$: Observable<StoreModel[]>;

  constructor(
    private dataService: DataService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private StoreState: Store<fromStore.StoreState>,
    private ShoppingListState: Store<fromShoppingList.ShoppingListState>
  ) {} // constructor

  ngOnInit() {
    this.StoreArray$ = this.StoreState.select(fromRoot.GetStores);
    this.ActiveShoppingList$ = this.ShoppingListState.select(
      fromRoot.GetActiveShoppingList
    ).pipe(take(1));
    this.ActiveStore$ = this.StoreState.select(fromRoot.GetActiveStore).pipe(
      take(1)
    );

    this.ActiveShoppingList$.pipe(take(1)).subscribe((CurrentShoppingList) => {
      this.EditShoppingListForm = this.formBuilder.group({
        shoppingListId: [CurrentShoppingList.shoppingListId],
        shoppingListName: [
          CurrentShoppingList.shoppingListName,
          Validators.required,
        ],
        creationDate: [CurrentShoppingList.creationDate],
        storeId: [CurrentShoppingList.storeId],
      });
    });
  } //ngOnInit

  EditShoppingList(EditShoppingListForm: FormGroup) {
    const ShoppingList: ShoppingListModel = EditShoppingListForm.value;

    this.ActiveShoppingList$.pipe(take(1)).subscribe((asl) => {
      // If store has changed, then pass value true so that some extra changes can be made
      // to the main State
      if (asl.storeId != ShoppingList.storeId) {
        this.dataService.UpdateShoppingList(
          ShoppingList,
          ShoppingList.shoppingListId,
          true
        );
      } else {
        this.dataService.UpdateShoppingList(
          ShoppingList,
          ShoppingList.shoppingListId,
          false
        );
      } //else
      this.ShoppingListState.dispatch(
        new ShoppingListActions.RemoveActiveShoppingList()
      );
      this.router.navigate(["/shopping-list"]);
    });
  } // Edit Shopping List

  ngOnDestroy(): void {
    this.ShoppingListState.dispatch(
      new ShoppingListActions.RemoveActiveShoppingList()
    );
  } //ngOnDestroy
} //Export
