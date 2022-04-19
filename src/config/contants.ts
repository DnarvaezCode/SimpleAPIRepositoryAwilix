import dotenv from "dotenv";
dotenv.config();
export const URI_SERVER = process.env.URI_SERVER || "";
export const PORT = process.env.PORT || 4000;
export const CLOUD_NAME = process.env.CLOUD_NAME || "";
export const API_KEY = process.env.API_KEY || "";
export const API_SECRET = process.env.API_SECRET || "";
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
