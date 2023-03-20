import LHTLogger from "../../utils/logger";
import CustomerModel from "../../models/sampleAnalytics";

export default class BLManager {
    async monitorMeters() {
        // Cron Job Business logic-
        LHTLogger.info("JobManager:monitorMeters", "monitoring");
        return true;
    }

    async getDetails(requestData) {
        LHTLogger.info("JobManager:getDetails", "getDetails", "Pavan");

        const { page = 1, limit = 10 } = requestData.query;

        const getList = await CustomerModel.find({
            name: { $regex: RegExp("^" + requestData.query.name + ".*", "i") },
        })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        if (getList.length <= 0) {
            throw "No Data Found";
        }

        return { Total: getList.length, Data: getList };
    }
}
