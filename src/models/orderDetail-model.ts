import { Schema } from "mongoose";

export interface IOrderDetail {
  id: String;
  quantity: Number;
  product: Schema.Types.ObjectId;
}

export const orderDetailSchema = new Schema<IOrderDetail>({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
});
