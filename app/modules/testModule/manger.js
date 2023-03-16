import LHTLogger from "../../utils/logger";

export default class Manger {
  async successMethod(_requestData) {
    // API business logic
    LHTLogger.info("testModule:successMethod", "Api success", {}, "Guna R");
    return true;
  };

  async failureMethod (_requestData) {
    const error = new Error();
    error.statusCode = 404; // optional custom status code
    // LHTLogger.error("testModule:failureMethod", "Api Faliure", {}, "", error.stack, "Guna R");
    throw error
  };
}
