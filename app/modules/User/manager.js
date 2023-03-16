import LHTLogger from "../../utils/logger";
import userModel from "../../models/userAuthentication";
import jwt from "jsonwebtoken";
import config from "../../../config/env/development";
import { apiFailureMessage } from "../../common/constants";

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

        return new userModel({ ...requestData, addedOn: Date.now() }).save();

        
    }

    async userLogin(requestData) {
        LHTLogger.info("JobManager:userLogin", "userLoginSuccessful");

        let user = await userModel.findOne(requestData);
        if (!user) {
            throw apiFailureMessage.USER_DOESNT_EXISTS;
        }

        // Create token
        const token = jwt.sign(
            { userName: requestData.userName, password: requestData.password },
            config.JWT_TOKEN,
            {
                expiresIn: "1h",
            }
        );

        // let decoded = jwtDecode(token);

        // console.log(decoded);

        // console.log("token, ", token);
        // console.log("userData", user);

        return token;
    }

    async authenticate(requestData) {
        LHTLogger.info("JobManager:authenticate", "authenticate");

        const token = requestData.headers['authorization'].split(' ')[1];
        console.log("token", token);

        if (!token) throw token;

        let decode = jwt.verify(token, config.JWT_TOKEN);
        console.log("decode", decode)

        return decode;

    }


}
