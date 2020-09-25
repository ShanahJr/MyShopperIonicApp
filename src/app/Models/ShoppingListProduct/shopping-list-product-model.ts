import { ProductModel } from "../Product/product-model";

export class ShoppingListProductModel {
  constructor() {}

  shoppingListProductId: number;
  productId: number;
  shoppingListId: number;
  productQuantity: number;
  checked: boolean;

  product: ProductModel;
}
