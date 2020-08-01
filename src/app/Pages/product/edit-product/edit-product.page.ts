import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { DataService } from "src/app/Services/data.service";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

import { ProductModel } from "../../../Models/Product/product-model";
import { CategoryModel } from "src/app/Models/Category/category-model";
import { async } from "@angular/core/testing";
import { Observable } from "rxjs";

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
const { Camera } = Plugins;

import { DomSanitizer } from "@angular/platform-browser";

import * as fromRoot from "../../../app.reducer";
import * as fromProduct from "../../../Reducers/Product/Product.reducer";
import * as ProductActions from "../../../Reducers/Product/Product.actions";
import * as fromCategory from "../../../Reducers/Category/Category.reducer";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";

import { PopoverPage } from "../../../Components/popover/popover.page";

@Component({
  selector: "app-edit-product",
  templateUrl: "./edit-product.page.html",
  styleUrls: ["./edit-product.page.scss"],
})
export class EditProductPage implements OnInit, OnDestroy {
  EditProductForm: FormGroup;
  private ErrorMessage: string;
  public message: string;
  Logo: string;
  isLogoAvailable = false;

  ActiveProduct$: Observable<ProductModel>;
  CategoryArray$: Observable<CategoryModel[]>;

  constructor(
    private dataService: DataService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private actionSheetCtrl: ActionSheetController,
    private popover: PopoverController,
    private ProductState: Store<fromProduct.ProductState>
  ) {}

  ngOnInit() {
    this.ActiveProduct$ = this.ProductState.select(
      fromRoot.GetActiveProduct
    ).pipe(take(1));
    this.CategoryArray$ = this.ProductState.select(fromRoot.GetCategorys);
    this.dataService.GetAllCategorys();

    this.ActiveProduct$.pipe(take(1)).subscribe((CurrentProduct) => {
      this.EditProductForm = this.formBuilder.group({
        productId: [CurrentProduct.productId],
        productName: [CurrentProduct.productName, Validators.required],
        categoryId: [CurrentProduct.categoryId],
        currentPrice: [CurrentProduct.currentPrice, Validators.required],
        priceCreationDate: [CurrentProduct.priceCreationDate],
      });

      this.Logo = CurrentProduct.productPicture;
      this.isLogoAvailable = true;
    });
  } //ngOnInit

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

  EditProduct(EditProductForm: FormGroup) {
    const Product: ProductModel = EditProductForm.value;
    Product.productPicture = this.Logo;

    this.dataService.UpdateProduct(Product, Product.productId);
    this.router.navigate(["/product"]);
  } // Edit Product

  transformer(image: string) {
    if (image) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        "data:image;base64," + image
      );
    } else {
      return "../../../assets/NoImage.jpg";
    }
  }

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
    var image = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source,
    });
    this.isLogoAvailable = true;
    this.Logo = image.base64String;
  }

  ngOnDestroy(): void {
    this.ProductState.dispatch(new ProductActions.RemoveActiveProduct());
  }
}
