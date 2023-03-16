import Utils from "../../utils";
import BLManager from "./manger";
import HTTPHandler from "../../utils/HTTPHandler";
import LHTLogger from "../../utils/logger";

export default class Index {
  async successRoute(request, response) {
    LHTLogger.info("TestController", "successMethod", request.query, "Guna R");
    const [error, testResponse] = await Utils.parseResponse(
      new BLManager().successMethod(request.query)
    );
    if (!testResponse) return HTTPHandler.error(response, error, error ? error.message : "");
    return HTTPHandler.success(response, testResponse);
  };

  async failureRoute(request, response) {
    LHTLogger.info("TestController", "failureMethod", request.query, "Guna R");
    const [error, testResponse] = await Utils.parseResponse(
      new BLManager().failureMethod(request.query)
    );
    if (!testResponse) return HTTPHandler.error(response, error, error ? error.message : "");
    return HTTPHandler.success(response, testResponse);
  };
}
