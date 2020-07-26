import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "src/app/Services/data.service";
import { StateService } from "src/app/Services/state.service";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { StoreModel } from "src/app/Models/Store/store-model";

import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { Store } from "@ngrx/store";

import * as fromRoot from "../../../app.reducer";
import * as fromStore from "../../../Reducers/Store/Store.reducer";
import * as fromShoppingList from "../../../Reducers/ShoppingList/ShoppingList.reducer";
import * as ShoppingListActions from "../../../Reducers/ShoppingList/ShoppingList.actions";

@Component({
  selector: "app-create-shopping-list",
  templateUrl: "./create-shopping-list.page.html",
  styleUrls: ["./create-shopping-list.page.scss"],
})
export class CreateShoppingListPage implements OnInit {
  private CreateShoppingListForm: FormGroup;
  private ActiveStore$: Observable<StoreModel>;

  constructor(
    private dataService: DataService,
    private stateService: StateService,
    private router: Router,
    private formBuilder: FormBuilder,
    private ShoppingListState: Store<fromShoppingList.ShoppingListState>,
    private StoreState: Store<fromStore.StoreState>
  ) {}

  ngOnInit() {
    this.ActiveStore$ = this.StoreState.select(fromRoot.GetActiveStore);

    this.ActiveStore$.pipe(take(1)).subscribe((store) => {
      this.CreateShoppingListForm = this.formBuilder.group({
        shoppingListName: ["", Validators.required],
        // creationDate: [""],
        storeId: [store.storeId],
      });
    });
  } //ngOnInit

  CreateShoppingList(ShoppingListForm: FormGroup) {
    const ShoppingList = ShoppingListForm.value;
    this.dataService.AddShoppingList(ShoppingList);
    this.router.navigate(["/shopping-list"]);
  } // Create Store
}
