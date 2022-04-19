import { Response } from "express";
import { ApplicationException } from "../exceptions/application-exception";

export abstract class BaseController {
  handleException(err: any, res: Response) {
    if (err instanceof ApplicationException) {
      return res.status(500).json({ message: err.message });
    } else {
      throw new Error(err);
    }
  }
}
