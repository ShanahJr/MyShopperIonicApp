import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "src/app/Services/data.service";

import { Observable } from "rxjs";
import { map, take, takeUntil } from "rxjs/operators";
import { Store } from "@ngrx/store";

import * as fromRoot from "../../app.reducer";
import * as fromProduct from "../../Reducers/Product/Product.reducer";
import * as ProductActions from "../../Reducers/Product/Product.actions";

import { PopoverController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";

import { ProductModel } from "../../Models/Product/product-model";
import { PageInfo } from "../../Models/PageInfo/page-info";
import { PopoverPage } from "../../Components/popover/popover.page";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-product",
  templateUrl: "./product.page.html",
  styleUrls: ["./product.page.scss"],
})
export class ProductPage implements OnInit {
  ProductArray$: Observable<ProductModel[]>;
  // pageInfo = new PageInfo();
  pageInfo$: Observable<PageInfo>;
  constructor(
    private dataService: DataService,
    private router: Router,
    private alertController: AlertController,
    private popover: PopoverController,
    private sanitizer: DomSanitizer,
    private ProductState: Store<fromProduct.ProductState>
  ) {}

  ngOnInit() {
    this.ProductArray$ = this.ProductState.select(fromRoot.GetProducts);
    this.pageInfo$ = this.ProductState.select(fromRoot.GetPageInfo);
    // this.pageInfo.pageSize = 6;
    // this.pageInfo.pageNumber = 1;
    this.pageInfo$.pipe(take(1)).subscribe((pageInfo) => {
      this.GetProducts(pageInfo);
    });
  } //ng On Init

  GetProducts(pageInfo: PageInfo) {
    this.dataService.GetAllProducts(pageInfo);
  } // Get all the products

  ViewProductDetails(id: number) {
    this.CreatePopOver(id);
  }

  CreateProduct() {
    this.router.navigate(["/product/create-product"]);
  } // Create Product

  UpdateProduct(id: Number) {
    this.EditProduct(id);
  }

  DeleteProduct(id: number) {
    this.PresentAlert(id);
  }

  Search(event: any) {
    if (event.target.value != "") {
      var pageInfo = new PageInfo();
      pageInfo.pageNumber = 1;
      pageInfo.pageSize = 6;
      this.dataService.SearchProducts(event.target.value, pageInfo);
    } else {
      var pageInfo = new PageInfo();
      pageInfo.pageNumber = 1;
      pageInfo.pageSize = 6;
      this.dataService.GetAllProducts(pageInfo);
    }
  } // Search Method

  NextPage() {
    this.ProductState.dispatch(new ProductActions.AddPageNumber());
    this.pageInfo$.pipe(take(1)).subscribe((pageInfo) => {
      this.dataService.GetAllProducts(pageInfo);
    });
  }

  PreviousPage() {
    this.ProductState.dispatch(new ProductActions.SubtractPageNumber());
    this.pageInfo$.pipe(take(1)).subscribe((pageInfo) => {
      this.dataService.GetAllProducts(pageInfo);
    });
  }

  transform(image: string) {
    if (image) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        "data:image;base64," + image
      );
    } else {
      return "../../../assets/NoImage.jpg";
    }
  }

  CreatePopOver(id: any) {
    this.ProductArray$.pipe(take(1)).subscribe((array) => {
      var Product: ProductModel = array.find((a) => a.productId == id);
      this.ProductState.dispatch(new ProductActions.SetActiveProduct(Product));

      this.popover
        .create({
          component: PopoverPage,
          showBackdrop: true,
          componentProps: {
            Mode: "Product",
            Name: Product.productName,
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
            this.ProductArray$.pipe(take(1)).subscribe((data) => {
              const position = data.findIndex((d) => d.productId === id);
              this.dataService.DeleteProduct(id);
            });
          }, //Handler for yes please
        },

        "Oh No!",
      ], //Buttons
    });

    await alert.present();
  } //Present Alert

  EditProduct(id: Number) {
    this.ProductArray$.pipe(take(1)).subscribe((product) => {
      product.forEach((element) => {
        if (element.productId == id) {
          this.ProductState.dispatch(
            new ProductActions.SetActiveProduct(element)
          );
        }
      });
    });
    this.router.navigate(["/product/edit-product"]);
  } // Edit Product
}
