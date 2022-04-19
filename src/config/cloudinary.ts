import fs from "fs-extra";
import { v2 as cloudinary, ConfigOptions } from "cloudinary";
import { CLOUD_NAME, API_KEY, API_SECRET } from "./contants";

const configOption: ConfigOptions = {
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
};

cloudinary.config(configOption);

export const uploadImage = async (file: any) => {
  return await cloudinary.uploader.upload(file.tempFilePath);
};

export const removeImage = async (item: any) => {
  return await cloudinary.uploader.destroy(item.public_id);
};

export const removeFile = (file: any) => {
  fs.removeSync(file.tempFilePath);
};
