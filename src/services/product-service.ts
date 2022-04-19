import { IProduct, productSchema } from "./../models/product-model";
import { GenericRepository } from "../repositories/generic-repository";

export class ProductService extends GenericRepository<IProduct> {
  constructor() {
    super("Product", productSchema);
  }
}
