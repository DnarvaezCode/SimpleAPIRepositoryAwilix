import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { GET, POST, PUT, DELETE, route } from "awilix-express";
import { Request, Response } from "express";
import { BaseController } from "../common/controllers/base-controller";
import { UserService } from "../services/user-service";
import { JWT_SECRET_KEY } from "../config/contants";
import { IUser } from "../models/user-model";

@route("/api/user")
export class UserController extends BaseController {
  /**
   * @param {UserService} userService: Inicializar propiedad.
   */
  constructor(private readonly userService: UserService) {
    super();
  }

  @GET()
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.findAllAsync();
      res.status(200).json(users);
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route("/:id")
  @GET()
  async getUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.userService.findById(id);
      if (!user)
        return res.status(404).json({ message: "No se encontró el registro." });
      res.status(200).json(user);
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route("/register")
  @POST()
  async register(req: Request, res: Response) {
    try {
      const { password } = req.body;
      if (password) {
        req.body.passwordHash = bcrypt.hashSync(password, 10);
      }

      const result = await this.userService.createAsync(req.body);
      if (!result)
        return res.status(500).json({
          message: "Ocurrio un error al intentar guardar la información.",
        });
      res.status(200).json({ message: "Información insertada." });
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route("/login")
  @POST()
  async login(req: Request, res: Response) {
    try {
      const user = await this.userService.findOne({ email: req.body.email });
      if (!user)
        return res
          .status(404)
          .json({ success: false, message: "No se encontró el usuario." });

      if (user && bcrypt.compareSync(req.body.password, user.passwordHash))
        return res.status(200).json({
          success: false,
          message: "Usuario autenticado.",
          user: {
            name: user.name,
            email: user.email,
            token: this.createToke(JWT_SECRET_KEY, user),
          },
        });

      res
        .status(200)
        .json({ success: false, message: "Usuario o contraseña no valida." });
    } catch (error) {
      this.handleException(error, res);
    }
  }

  createToke(secret: string, user: IUser) {
    return jwt.sign(
      {
        //userId: user.id,
        isAdmin: user.isAdmin,
      },
      secret,
      {
        expiresIn: "1d",
      }
    );
  }
}
