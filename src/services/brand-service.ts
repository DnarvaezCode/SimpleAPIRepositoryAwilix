import { IBrand, brandSchema } from "../models/brand-model";
import { GenericRepository } from "../repositories/generic-repository";

export class BrandService extends GenericRepository<IBrand> {
  constructor() {
    super("Brand", brandSchema);
  }
}
