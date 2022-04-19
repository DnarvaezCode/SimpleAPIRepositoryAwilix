import cors from "cors";
import fileupload from "express-fileupload";
import express, { Application } from "express";
import loadContainer from "./container";
import connection from "./config/connection";
import { loadControllers } from "awilix-express";
import { PORT } from "./config/contants";
import { jwtAuth } from "./common/helpers/jwt-validate";
import { errorHandler } from "./common/exceptions/error-handler";

export class Server {
  public app: Application;
  /**
   *Inicializa las propiedades de la clase
   */
  constructor() {
    this.app = express();
    connection.connectToMongo();
    this.middleware();
    loadContainer(this.app);
  }

  middleware() {
    this.app.use(cors());
    this.app.options("*", cors);
    this.app.use(express.json());
    /**Validar la autenticación basada en jwt.*/
    this.app.use(jwtAuth());
    /**Mandar error personalizado */
    this.app.use(errorHandler);

    this.app.use(
      fileupload({
        useTempFiles: true,
        tempFileDir: "./upload",
      })
    );
  }

  useControllers() {
    this.app.use(
      loadControllers("controllers/*.ts", {
        cwd: __dirname,
      })
    );
  }

  listen() {
    this.app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
}
