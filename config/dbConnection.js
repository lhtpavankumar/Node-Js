import Config from ".";
import mongoose from "mongoose";
import fs from "fs";
import LHTLogger from "../app/utils/logger";

export default class DBConnection {
  static async connect() {
    LHTLogger.info("DBConnection", `DB trying to connect with ${Config.DB}`, {}, "Ayush K");

    const options = DBConnection.getDBConnectOptions();
    return mongoose.connect(Config.DB, options);
  }

  static getDBConnectOptions() {
    const options = {
      keepAlive: 1,
      poolSize: 10,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    if (Config.IS_DOCUMENT_DB !== "true") return options;

    // Need to add project specific RDS file in config directory
    const caContent = [fs.readFileSync(__dirname + "/" + Config.RDS_FILE)];
    return {
      ...options,
      autoReconnect: true,
      ssl: true,
      sslValidate: false,
      sslCA: caContent,
      useCreateIndex: true,
      retryWrites: false,
    };
  }
}
