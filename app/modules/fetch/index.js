import BLManager from "./manager";
import LHTLogger from "../../utils/logger";
import Utils from "../../utils";
import HTTPHandler from "../../utils/HTTPHandler";

export default class JobController {
    async monitorMeter() {
        await new BLManager().monitorMeters().catch((err) =>
            LHTLogger.error(`monitorMeter`, "Job Failed", err)
        );
    }


    async getDetails(request, response) {
        LHTLogger.info('getDetails', "Inside getDetails", request.body)
        
        const [error, data] = await Utils.parseResponse(new BLManager().getDetails(request))
        LHTLogger.info('getDetails', "After getDetails", data)
        if (error || !data) return HTTPHandler.error(response, error)
        return HTTPHandler.success(response, data)
    }
}



