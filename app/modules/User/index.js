import BLManager from "./manager";
import LHTLogger from "../../utils/logger";
import HTTPHandler from "../../utils/HTTPHandler";
import Utils from "../../utils";

export default class JobController {
    async monitorMeter() {
        await new BLManager().monitorMeters().catch((err) =>
            LHTLogger.error(`monitorMeter`, "Job Failed", err)
        );
    }

    async createUser(request, response) {
        LHTLogger.info('createUser', "Inside createUser", request.body)
        const [error, data] = await Utils.parseResponse(new BLManager().createUser(request.body))
        if (error || !data) return HTTPHandler.error(response, error)
        return HTTPHandler.success(response, data)
    }

    async userLogin(request, response) {
        LHTLogger.info('userLogin', "Inside userLogin", request.body)
        const [error, data, token] = await Utils.parseResponse(new BLManager().userLogin(request.body))
        LHTLogger.info('userLogin', "Inside After userLogin", data)
        if (error || !data) return HTTPHandler.error(response, error)
        return HTTPHandler.success(response, data)
    }

    async authenticate(request, response) {
        LHTLogger.info('authenticate', "Inside authenticate", request.body)
        const [error, data] = await Utils.parseResponse(new BLManager().authenticate(request))
        LHTLogger.info('authenticate', "Inside After authenticate", data)
        if (error || !data) return HTTPHandler.error(response, error)
        return HTTPHandler.success(response, data)
    }


}



