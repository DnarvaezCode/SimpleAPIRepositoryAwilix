import { Schema } from "mongoose";

export interface IOrder {
  id: String;
  user: Schema.Types.ObjectId;
  orderDetails: Array<Schema.Types.ObjectId>;
  shippingAddress1: String;
  shippingAddress2: String;
  city: String;
  zip: String;
  country: String;
  phone: String;
  status: String;
  totalPrice: Number;
  createOrdered: Date;
}

export const orderSchema = new Schema<IOrder>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderDetails: [
    {
      type: Schema.Types.ObjectId,
      ref: "OrderDetail",
      required: true,
    },
  ],
  shippingAddress1: {
    type: String,
    required: true,
  },
  shippingAddress2: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  totalPrice: {
    type: Number,
  },
  createOrdered: {
    type: Date,
    default: Date.now,
  },
});
