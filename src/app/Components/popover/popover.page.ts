import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { Router } from "@angular/router";
import { DataService } from "src/app/Services/data.service";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { Store } from "@ngrx/store";

import { MainStoreModel } from "../../Models/MainStore/main-store-model";
import { StoreModel } from "../../Models/Store/store-model";
import { ProductModel } from "../../Models/Product/product-model";
import { ShoppingListModel } from "../../Models/ShoppingList/shopping-list-model";
import { CategoryModel } from "src/app/Models/Category/category-model";

import * as fromStore from "../../Reducers/Store/Store.reducer";
import * as StoreActions from "../../Reducers/Store/Store.actions";
import * as fromProduct from "../../Reducers/Product/Product.reducer";
import * as ProductActions from "../../Reducers/Product/Product.actions";
import * as fromShoppingList from "../../Reducers/ShoppingList/ShoppingList.reducer";
import * as ShoppingListActions from "../../Reducers/ShoppingList/ShoppingList.actions";
import * as fromCategory from "../../Reducers/Category/Category.reducer";
import * as CategoryActions from "../../Reducers/Category/Category.actions";

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
  ActiveCategory$: Observable<CategoryModel>;
  ActiveProduct$: Observable<ProductModel>;
  MainStoreName: string;

  private CreateCategoryForm: FormGroup;

  ActiveShoppingList$: Observable<ShoppingListModel>;
  constructor(
    private popover: PopoverController,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private MainStoreState: Store<fromMainStore.MainStoreState>,
    private StoreState: Store<fromStore.StoreState>,
    private ProductState: Store<fromProduct.ProductState>,
    private ShoppingListState: Store<fromShoppingList.ShoppingListState>,
    private CategoryState: Store<fromCategory.CategoryState>
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
    if (this.Mode == "CreateCategory") {
      this.CreateCategoryForm = this.formBuilder.group({
        categoryName: ["", Validators.required],
        categoryDescription: [""],
      });
    }
    if (this.Mode == "Product") {
      this.ActiveProduct$ = this.ProductState.select(fromRoot.GetActiveProduct);

      this.ActiveProduct$.pipe(take(1)).subscribe((product) => {
        this.dataService.GetCategory(product.categoryId);
      });

      this.ActiveCategory$ = this.CategoryState.select(
        fromRoot.GetActiveCategory
      );
    } // If Main Store is Passed
  } // ngOnInit

  ClosePopOver() {
    this.popover.dismiss();
  } // ClosePopOver

  CreateCategory(CategoryForm: FormGroup) {
    var category: CategoryModel = CategoryForm.value;

    this.dataService.AddCategory(category);
    this.popover.dismiss();
  } // Create Category

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
    if (this.Mode == "Product") {
      this.ProductState.dispatch(new ProductActions.RemoveActiveProduct());
    }
  } // ngOnDestroy
}
