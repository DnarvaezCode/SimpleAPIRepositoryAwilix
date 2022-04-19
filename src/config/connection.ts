import mongoose from "mongoose";
import { URI_SERVER } from "./contants";
class Connection {
  async connectToMongo() {
    try {
      const db = await mongoose.connect(URI_SERVER);
      console.log("Conneted to ", db.connection.name);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Connection();
