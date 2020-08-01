import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "src/app/Services/data.service";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

import * as fromRoot from "../../../app.reducer";
import * as fromCategory from "../../../Reducers/Category/Category.reducer";
import * as CategoryActions from "../../../Reducers/Category/Category.actions";

import { CategoryModel } from "../../../Models/Category/category-model";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";

@Component({
  selector: "app-edit-category",
  templateUrl: "./edit-category.page.html",
  styleUrls: ["./edit-category.page.scss"],
})
export class EditCategoryPage implements OnInit {
  EditCategoryForm: FormGroup;
  private ErrorMessage: string;
  public message: string;

  ActiveCategory$: Observable<CategoryModel>;

  constructor(
    private dataService: DataService,
    private router: Router,
    private formBuilder: FormBuilder,
    private CategoryState: Store<fromCategory.CategoryState>
  ) {}

  ngOnInit() {
    this.ActiveCategory$ = this.CategoryState.select(
      fromRoot.GetActiveCategory
    ).pipe(take(1));
    //this.ActiveCategory = this.store.select(fromRoot.GetActiveCategory);

    this.ActiveCategory$.pipe(take(1)).subscribe((category) => {
      this.EditCategoryForm = this.formBuilder.group({
        categoryId: [category.categoryId],
        categoryName: [category.categoryName, Validators.required],
        categoryDescription: [category.categoryDescription],
      });
    });
  } //ngOnInit

  EditCategory(EditCategoryForm: FormGroup) {
    const category: CategoryModel = EditCategoryForm.value;
    this.dataService.UpdateCategory(category, category.categoryId);
    this.router.navigate(["/category"]);
  } // Edit main store
}
