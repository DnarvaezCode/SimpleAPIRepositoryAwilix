import { ClientSession } from "mongoose";
export interface IGeneryRespository<T> {
  findAllAsync(entityName: string, populateOptions: any): Promise<T[]>;
  findById(id: string, entityName: string): Promise<T | null>;
  findOne(filter: Object): Promise<T | null>;
  createAsync(item: T): Promise<boolean>;
  insertAsync(item: T): Promise<T>;
  updateByIdAsync(id: string, item: T): Promise<boolean>;
  deleteByIdAsync(id: string): Promise<boolean>;
}
