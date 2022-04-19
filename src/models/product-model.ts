import { Schema } from "mongoose";

export interface IProduct {
  id: String;
  name: String;
  description: String;
  price: Number;
  category: Schema.Types.ObjectId;
  brand: Schema.Types.ObjectId;
  image: Object;
  inStock: Number;
  rating: Number;
  isFeatured: Boolean;
  createDate: Date;
  status: Boolean;
}

export const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  image: {
    url: String,
    public_id: String,
  },
  inStock: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    default: true,
  },
});
