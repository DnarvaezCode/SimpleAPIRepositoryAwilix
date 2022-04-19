import { Schema } from "mongoose";

export interface IUser {
  id: String;
  name: String;
  email: String;
  passwordHash: string;
  isAdmin: Boolean;
  street: String;
  apartament: String;
  city: String;
  zip: String;
  country: String;
  phone: String;
  createDate: Date;
}

export const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  street: {
    type: String,
    default: "",
  },
  apartament: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  zip: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});
