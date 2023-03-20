import LHTLogger from "../../utils/logger";
import userModel from "../../models/User";
import jwt from "jsonwebtoken";
import config from "../../../config/env/development";
import { apiFailureMessage } from "../../common/constants";
import { response } from "express";

export default class BLManager {
  async monitorMeters() {
    // Cron Job Business logic-
    LHTLogger.info("JobManager:monitorMeters", "monitoring");
    return true;
  }

  async createUser(requestData) {
    LHTLogger.info("JobManager:createUser", "createdUser");

    let user = await userModel.findOne(requestData);
    if (user) {
      throw apiFailureMessage.USER_EXISTS;
    }

    // Create token
    const token = jwt.sign(
      {
        name: requestData.name,
        email: requestData.password,
        role: requestData.role,
      },
      config.JWT_TOKEN
      // {
      //   expiresIn: "1h",
      // }
    );
    let resp = await new userModel({ ...requestData, addedOn: Date.now() }).save();
    console.log("rESPONSe", resp)

    return {
      Data: resp,
      jwtToken: token,
    };
  }


  async authenticateAdmin(requestData) {
    LHTLogger.info("JobManager:authenticate", "authenticateAdmin");

    const token = requestData.headers['authorization'].split(' ')[1];
    console.log("token", token);

    if (!token) throw token;

    let decode = jwt.verify(token, config.JWT_TOKEN);
    if (decode.role === "user") {
      throw "CANT ACCESS THIS API";
    }
    console.log("decode", decode)

    return decode;

  }
}
