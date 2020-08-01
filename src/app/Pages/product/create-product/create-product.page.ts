import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "src/app/Services/data.service";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import {
  Plugins,
  CameraResultType,
  CameraSource,
  CameraDirection,
} from "@capacitor/core";
import {
  Platform,
  ActionSheetController,
  PopoverController,
} from "@ionic/angular";
import { ProductModel } from "src/app/Models/Product/product-model";
import { CategoryModel } from "src/app/Models/Category/category-model";
const { Camera } = Plugins;

import { DomSanitizer } from "@angular/platform-browser";
import * as fromRoot from "../../../app.reducer";
import * as fromProduct from "../../../Reducers/Product/Product.reducer";
import * as fromCategory from "../../../Reducers/Category/Category.reducer";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { PopoverPage } from "../../../Components/popover/popover.page";

@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.page.html",
  styleUrls: ["./create-product.page.scss"],
})
export class CreateProductPage implements OnInit {
  private CreateProductForm: FormGroup;
  private ErrorMessage: string;
  public message: string;
  Logo: string;
  isLogoAvailable = false;
  CategoryArray$: Observable<CategoryModel[]>;

  constructor(
    private dataService: DataService,
    private router: Router,
    private formBuilder: FormBuilder,
    private actionSheetCtrl: ActionSheetController,
    private popover: PopoverController,
    private sanitizer: DomSanitizer,
    private ProductState: Store<fromProduct.ProductState>,
    private CategoryState: Store<fromCategory.CategoryState>
  ) {} // Constructor

  ngOnInit() {
    this.CategoryArray$ = this.ProductState.select(fromRoot.GetCategorys);
    this.dataService.GetAllCategorys();

    this.CreateProductForm = this.formBuilder.group({
      productName: ["", Validators.required],
      productPicture: [""],
      categoryId: [""],
      currentPrice: ["", Validators.required],
    });
  } //ngOnInit

  CreateProduct(ProductForm: FormGroup) {
    var product: ProductModel = ProductForm.value;
    product.productPicture = this.Logo;

    this.dataService.AddProduct(product);
    this.router.navigate(["/product"]);
  } // Create Product

  CreateCategory() {
    this.CreatePopOver();
  }

  CreatePopOver() {
    this.popover
      .create({
        component: PopoverPage,
        showBackdrop: true,
        componentProps: {
          Mode: "CreateCategory",
          Name: "Create Category",
        },
      })
      .then((popoverElement) => {
        popoverElement.present();
      });
  } // Create popover

  transformer() {
    if (this.isLogoAvailable) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        "data:image;base64," + this.Logo
      );
    } else {
      return "../../../../assets/NoImage.jpg";
    }
  } //transformer

  async selectImageSource() {
    const buttons = [
      {
        text: "Take Photo",
        icon: "camera",
        handler: () => {
          this.addImage(CameraSource.Camera);
        },
      },
      {
        text: "Gallery",
        icon: "image",
        handler: () => {
          this.addImage(CameraSource.Photos);
        },
      },
    ];

    const actionSheet = await this.actionSheetCtrl.create({
      header: "Select Image Source",
      buttons,
    });
    await actionSheet.present();
  } // End of select image source

  async addImage(source: CameraSource) {
    console.log("I clicked on Gallery");
    var image = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source,
    });
    this.isLogoAvailable = true;
    this.Logo = image.base64String;
    console.log(this.Logo);
    // this.InjectImage();
  }
} // Export
