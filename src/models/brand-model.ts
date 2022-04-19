import { Schema } from "mongoose";

export interface IBrand {
  id: String;
  name: String;
  status: Boolean;
}

export const brandSchema = new Schema<IBrand>({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: true,
  },
});
