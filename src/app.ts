import { Server } from "./server";
const app = new Server();
app.useControllers();
app.listen();
