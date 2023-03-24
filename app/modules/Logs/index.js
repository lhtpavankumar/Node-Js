import BLManager from "./manager";
import LHTLogger from "../../utils/logger";
import HTTPHandler from "../../utils/HTTPHandler";
import Utils from "../../utils";

export default class JobController {
    async verifyCSV(request, response) {
        LHTLogger.info('verifyCSV', "Inside verifyCSV", request.body)
        const [error, data] = await Utils.parseResponse(new BLManager().verifyCSV(request.body))
        if (error || !data) return HTTPHandler.error(response, error)
        return HTTPHandler.success(response, data)
    }
}
