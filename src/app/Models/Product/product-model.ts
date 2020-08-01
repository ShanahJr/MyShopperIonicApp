import { CheckboxControlValueAccessor } from "@angular/forms";

export class ProductModel {
  constructor() {}

  productId: number;
  productName: string;
  productPicture: string;
  categoryId: number;
  currentPrice: number;
  priceCreationDate: number;
}
