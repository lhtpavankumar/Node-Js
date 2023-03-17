import APP from "express";
import DBConnection from "./config/dbConnection";
import LhtLogger from "./app/utils/logger";
import Config from "./config";
import routes from "./routes";

const app = new APP();
require("./config/express")(app);

class Server {
  static async listen() {
    try {
      await DBConnection.connect()
      app.listen(Config.PORT);
      routes(app);
      import("./config/jobInitializer");
      LhtLogger.info("Server:listen", `Server Started on ${Config.PORT}`, {}, "Ayush K");
    } catch (error) {
      LhtLogger.error("Server:listen", "failed to connect", { err: error });
      process.exit(1);
    }
  }
}

Server.listen();
module.exports = app;
