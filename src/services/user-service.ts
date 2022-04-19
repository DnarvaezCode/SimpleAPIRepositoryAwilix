import { IUser, userSchema } from "./../models/user-model";
import { GenericRepository } from "../repositories/generic-repository";

export class UserService extends GenericRepository<IUser> {
  constructor() {
    super("User", userSchema);
  }
}
