import { GenericRepository } from "../repositories/generic-repository";
import { IOrder, orderSchema } from "../models/order-model";

export class OrderService extends GenericRepository<IOrder> {
  constructor() {
    super("Order", orderSchema);
  }
}
