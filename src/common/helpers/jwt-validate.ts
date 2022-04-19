import { JWT_SECRET_KEY } from "./../../config/contants";
import jsonwebtoken, { Options } from "express-jwt";
import { Request } from "express";

export const jwtAuth = () => {
  const jsonwebtokenOptions: Options = {
    secret: JWT_SECRET_KEY,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  };

  return jsonwebtoken(jsonwebtokenOptions).unless({
    path: [
      /**Excluir url sin autenticación */
      //{ url: "/api/product", methods: ["GET"] },
      "/api/user/login",
      "/api/user/register",
    ],
  });
};

async function isRevoked(req: Request, payload: any, done: any) {
  if (!payload.isAdmin) {
    done(null, true);
  }
  done();
}
