import { ICategory, categorySchema } from "../models/category.model";
import { GenericRepository } from "../repositories/generic-repository";

export class CategoryService extends GenericRepository<ICategory> {
  constructor() {
    super("Category", categorySchema);
  }
}
