import { GenericRepository } from "../repositories/generic-repository";
import { IOrderDetail, orderDetailSchema } from "../models/orderDetail-model";

export class OrderDetailService extends GenericRepository<IOrderDetail> {
  constructor() {
    super("OrderDetail", orderDetailSchema);
  }
}
