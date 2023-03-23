import LHTLogger from "../../utils/logger";
import CustomerModel from "../../models/sampleAnalytics";
import { apiFailureMessage } from "../../common/constants";

export default class BLManager {
  async monitorMeters() {
    // Cron Job Business logic-
    LHTLogger.info("JobManager:monitorMeters", "monitoring");
    return true;
  }

  async getDetails(requestData) {
    LHTLogger.info("JobManager:getDetails", "getDetails", "Pavan");

    const { page = 1, limit = 10 } = requestData.query;

    const getList = requestData.query.name
      ? await CustomerModel.find({
          name: { $regex: RegExp("^" + requestData.query.name + ".*", "i") },
        })
          .limit(limit * 1)
          .skip((page - 1) * limit)
      : await CustomerModel.find({})
          .limit(limit * 1)
          .skip((page - 1) * limit);

    if (getList.length <= 0) {
      throw "No Data Found";
    }

    return { Total: getList.length, Data: getList };
  }

  async createUser(requestData) {
    LHTLogger.info("JobManager:createUser", "createUser", "Pavan");

    LHTLogger.info("JobManager:createUser", "createdUser");

    let user = await CustomerModel.findOne({
      username: requestData.body.username,
    });
    console.log("USER", user);
    if (user) {
      throw apiFailureMessage.USER_EXISTS;
    }

    return new CustomerModel({ ...requestData.body }).save();
  }

  async updateUser(requestData) {
    LHTLogger.info("JobManager updateUser", "updateUser", "Pavan");

    LHTLogger.info("JobManager updateUser", "updatedUser");

    let user = await CustomerModel.findOne({ _id: requestData.body.id });
    console.log("USER", user);
    if (!user) {
      throw apiFailureMessage.DOESNT_EXISTS;
    }

    return await CustomerModel.findOneAndUpdate(
      { _id: requestData.body.id },
      { name: requestData.body.name }
    );
  }

  async deleteUser(requestData) {
    LHTLogger.info("JobManager:deleteUser", "deleteUser", "Pavan");

    LHTLogger.info("JobManager:deleteUser", "deletedUser");

    let user = await CustomerModel.findOne({ _id: requestData.body.id });
    console.log("USER", user);
    if (!user) {
      throw apiFailureMessage.DOESNT_EXISTS;
    }

    return await  CustomerModel.findByIdAndDelete({ _id: requestData.body.id });
  }
}
