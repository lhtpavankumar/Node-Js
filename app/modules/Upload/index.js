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

    async upload(request, response) {
        LHTLogger.info('upload', "Inside upload", request.body)
        LHTLogger.info('upload', "Inside upload File", request.file)
        if (!request.file) {
            return HTTPHandler.error(response, error);
        }
        const [error, data] = await Utils.parseResponse(new BLManager().upload(request))
        LHTLogger.info('upload', "After upload", data)
        if (error || !data) return HTTPHandler.error(response, error)
        return HTTPHandler.success(response, data)
    }

    async rename(request, response) {
        LHTLogger.info('rename', "Inside rename", request.body)
      
        const [error, data] = await Utils.parseResponse(new BLManager().rename(request))
        LHTLogger.info('rename', "After rename", data)
        if (error || !data) return HTTPHandler.error(response, error)
        return HTTPHandler.success(response, data)
    }

    async delete(request, response) {
        LHTLogger.info('delete', "Inside delete", request.body)

        const [error, data] = await Utils.parseResponse(new BLManager().delete(request))
        LHTLogger.info('delete', "After delete", data)
        if (error || !data) return HTTPHandler.error(response, error)
        return HTTPHandler.success(response, data)
    }
}
