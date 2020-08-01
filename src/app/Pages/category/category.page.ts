import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "src/app/Services/data.service";
import { DomSanitizer } from "@angular/platform-browser";

import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { Store } from "@ngrx/store";

import * as fromRoot from "../../app.reducer";
import * as fromCategory from "../../Reducers/Category/Category.reducer";
import * as CategoryActions from "../../Reducers/Category/Category.actions";

// import { ModalController } from '@ionic/angular';
import { PopoverController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";

import { CategoryModel } from "../../Models/Category/category-model";
import { PopoverPage } from "../../Components/popover/popover.page";

@Component({
  selector: "app-category",
  templateUrl: "./category.page.html",
  styleUrls: ["./category.page.scss"],
})
export class CategoryPage implements OnInit {
  CategoryArray$: Observable<CategoryModel[]>;

  constructor(
    private dataService: DataService,
    private router: Router,
    // public modalController: ModalController,
    private alertController: AlertController,
    private popover: PopoverController,
    private sanitizer: DomSanitizer,
    private category: Store<fromCategory.CategoryState>
  ) {
    //this.GetAllCategory();
  } // COnstructor

  ngOnInit() {
    this.CategoryArray$ = this.category.select(fromRoot.GetCategorys);
    this.GetCategorys();
  } //ngOnInit

  GetCategorys() {
    this.dataService.GetAllCategorys();
  } // Get all the Categorys

  ViewCategoryDetails(id: number) {
    this.CreatePopOver(id);
  }

  CreateCategory() {
    this.router.navigate(["/category/create-category"]);
  } // Create Category

  UpdateCategory(id: Number) {
    this.EditCategory(id);
  }
  DeleteCategory(id: Number) {
    this.PresentAlert(id);
  }

  CreatePopOver(id: any) {
    this.CategoryArray$.pipe(take(1)).subscribe((array) => {
      var Category: CategoryModel = array.find((a) => a.categoryId == id);
      this.category.dispatch(new CategoryActions.SetActiveCategory(Category));

      this.popover
        .create({
          component: PopoverPage,
          showBackdrop: true,
          componentProps: {
            Mode: "Category",
            Name: Category.categoryName,
          },
        })
        .then((popoverElement) => {
          popoverElement.present();
        });
    });
  } // Create popover

  async PresentAlert(id) {
    const alert = await this.alertController.create({
      header: "Warning",
      subHeader: "About to delete something",
      message: "Are you sure you want to delete this?",
      buttons: [
        {
          text: "Yes Please",
          handler: () => {
            this.CategoryArray$.pipe(take(1)).subscribe((data) => {
              const position = data.findIndex((d) => d.categoryId === id);
              this.dataService.DeleteCategory(id);
            });
          }, //Handler for yes please
        },

        "Oh No!",
      ], //Buttons
    });

    await alert.present();
  } //Present Alert

  EditCategory(id: Number) {
    this.CategoryArray$.pipe(take(1)).subscribe((category) => {
      category.forEach((element) => {
        if (element.categoryId == id) {
          this.category.dispatch(
            new CategoryActions.SetActiveCategory(element)
          );
        }
      });
    });
    this.router.navigate(["/category/edit-category"]);
  } // Edit ategory
}
