import LHTLogger from "../../utils/logger";
import uploadModel from "../../models/upload";
import { apiFailureMessage } from "../../common/constants";

export default class BLManager {
    async monitorMeters() {
        // Cron Job Business logic-
        LHTLogger.info("JobManager:monitorMeters", "monitoring");
        return true;
    }

    async upload(requestData) {

        LHTLogger.info("JobManager:upload", "uploaded", "Pavan");

        let user = await uploadModel.findOne({ name: requestData.body.name });
        if (user) {
            throw apiFailureMessage.USER_EXISTS;
        }

        let img = {
            data: "../../../../uploads" + requestData.file.fileName,
            contentType: requestData.file.mimetype,
        };

        return await new uploadModel({ img, name: requestData.body.name }).save();

    }

    async rename(requestData) {

        LHTLogger.info("JobManager:rename", requestData.body, "Pavan");

        let user = await uploadModel.findOne({ _id: requestData.body.id });
        if (!user) {
            throw apiFailureMessage.USER_DOESNT_EXISTS;
        }

        return await uploadModel.findOneAndUpdate({ _id: requestData.body.id }, { name: requestData.body.name })

    }

    async delete(requestData) {

        LHTLogger.info("JobManager:delete", requestData.body, "Pavan");

        let user = await uploadModel.findOne({ _id: requestData.body.id });
        if (!user) {
            throw apiFailureMessage.USER_DOESNT_EXISTS;
        }

        return await uploadModel.findByIdAndDelete({ _id: requestData.body.id });

    }
}

