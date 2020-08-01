import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "src/app/Services/data.service";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { CategoryModel } from "src/app/Models/Category/category-model";

@Component({
  selector: "app-create-category",
  templateUrl: "./create-category.page.html",
  styleUrls: ["./create-category.page.scss"],
})
export class CreateCategoryPage implements OnInit {
  private CreateCategoryForm: FormGroup;
  private ErrorMessage: string;
  public message: string;
  constructor(
    private dataService: DataService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.CreateCategoryForm = this.formBuilder.group({
      categoryName: ["", Validators.required],
      categoryDescription: [""],
    });
  } // ngOnInit

  CreateCategory(CategoryForm: FormGroup) {
    var category: CategoryModel = CategoryForm.value;

    this.dataService.AddCategory(category);
    this.router.navigate(["/category"]);
  } // Create Category
} // Export
