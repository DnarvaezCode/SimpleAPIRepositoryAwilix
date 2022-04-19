import { Request, Response } from "express";
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: any
) => {
  if (error.name === "UnauthorizedError") {
    return res.status(401).json({ message: error.message });
  }
  if (error.name === "ValidationError") {
    return res.status(401).json({ message: error.message });
  }
  return res.status(500).json({ message: error.message });
};
