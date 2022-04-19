import { Schema } from "mongoose";

export interface ICategory {
  id: String;
  name: String;
  status: Boolean;
}

export const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});
