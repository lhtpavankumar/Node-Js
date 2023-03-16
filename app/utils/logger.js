import Config from "../../config";
import { DateTimeHelper } from ".";
import { httpConstants } from "../common/constants";

export default class LHTLogger {
  /**
   * It logs the message with the log level as INFO.
   * @param functionName - The name of the function that is logging the message.
   * @param message - The message you want to log.
   * @param [payload] - This is the object that you want to log.
   * @param [devAlias] - This is the alias of the developer who is logging the message.
   */
  static info(functionName, message, payload = {}, devAlias = "") {
    LHTLogger.log(
      functionName,
      message,
      payload,
      devAlias,
      httpConstants.LOG_LEVEL_TYPE.INFO
    );
  }

  /**
   * It logs a message with the log level of DEBUG.
   * @param functionName - The name of the function that is calling the logger.
   * @param message - The message you want to log.
   * @param [payload] - This is the object that you want to log.
   * @param [devAlias] - This is the alias of the developer who is logging the message.
   */
  static debug(functionName, message, payload = {}, devAlias = "") {
    LHTLogger.log(
      functionName,
      message,
      payload,
      devAlias,
      httpConstants.LOG_LEVEL_TYPE.DEBUG
    );
  }

  /**
   * It logs a message with a log level of WARN.
   * @param functionName - The name of the function that is calling the logger.
   * @param message - The message you want to log.
   * @param [payload] - This is an object that contains the data that you want to log.
   * @param [devAlias] - This is the alias of the developer who is logging the message.
   */
  static warn(functionName, message, payload = {}, devAlias = "") {
    LHTLogger.log(
      functionName,
      message,
      payload,
      devAlias,
      httpConstants.LOG_LEVEL_TYPE.WARN
    );
  }

  /**
   * It logs an error message to the console.
   * @param functionName - The name of the function that is logging the error.
   * @param message - The message you want to log.
   * @param [payload] - This is the data that you want to log.
   * @param errorStack - This is the stack trace of the error.
   * @param [devAlias] - This is the developer alias that you want to use to identify the developer who
   * is logging the error.
   */
  static error(functionName, message, payload = {}, errorStack = "", devAlias = "") {
    const errorOrigin = LHTLogger.parseErrorStack(errorStack);
    LHTLogger.log(
      functionName,
      message,
      payload,
      devAlias,
      httpConstants.LOG_LEVEL_TYPE.ERROR,
      errorOrigin
    );
  }

  static log(functionName, message, payload, devAlias, logType, errorOrigin = "") {
    if (Config.IS_CONSOLE_LOG !== "true" && logType !== httpConstants.LOG_LEVEL_TYPE.ERROR) return;
    let logString = `[${DateTimeHelper.getFormattedDate()}] ${logType} ${errorOrigin}: ${functionName}: ${message}: ${JSON.stringify(
      payload
    )}: Developer : ${devAlias}`;
    switch (logType) {
      case httpConstants.LOG_LEVEL_TYPE.WARN:
        console.warn(logString);
        break;
      case httpConstants.LOG_LEVEL_TYPE.DEBUG:
        console.debug(logString);
        break;
      case httpConstants.LOG_LEVEL_TYPE.ERROR:
        console.error(logString);
        break;
      default:
        console.log(logString);
    }
  }
  static parseErrorStack(errorStack) {
    let errorOrigin;
    try {
      if (errorStack) {
          const [fullPath, Function] = errorStack.split('\n')[1].match(/at (.+) \((.+):(\d+):\d+\)/);
          const filePath = '/app/';
          errorOrigin = `at ${Function} ${filePath}${fullPath.split(filePath).pop().replace(/\)/g, '')}`;
        return errorOrigin;
      }
    } catch (_) {}
    
  }
}
