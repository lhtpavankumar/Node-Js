/**
 * Created by AyushK on 18/09/20.
 */

"use strict";

import { apiFailureMessage, httpConstants } from "../common/constants";
import { DateTime } from "luxon";
import { spawn } from "child_process";

export default class Utils {
  /**
   * This function is made to handle success and error callback!
   * @param promise
   * @returns {Promise<Promise|Bluebird<*[] | R>|Bluebird<any | R>|*|Promise<T | *[]>>}
   */
  static async parseResponse(promise) {
    return promise
      .then((data) => {
        return [null, data];
      })
      .catch((err) => [err]);
  }

  /**
   * It returns a promise that rejects with a message and status code
   * @param [message] - The message that will be returned to the client.
   * @param [statusCode] - The HTTP status code that will be returned to the client.
   * @returns A promise that is rejected with an object containing a message and a status code.
   */
  static returnRejection(
    message = apiFailureMessage.INTERNAL_SERVER_ERROR,
    statusCode = httpConstants.RESPONSE_CODES.SERVER_ERROR
  ) {
    return Promise.reject({ message, statusCode });
  }

  /**
   * It takes a command and a query, and returns the output of the command
   * @param cmd - The command to run.
   * @param query - The query you want to run.
   * @returns A promise that resolves to the data returned from the command.
   */
  async getDataWithCmd(cmd, query) {
    let buffer = "";
    const queryArgs = query.split(" ");
    const response = await new Promise((resolve, reject) => {
      const command = spawn(cmd, queryArgs);
      command.stdout.on("data", (data) => {
        buffer += data;
      });

      command.on("error", (err) => reject(new Error(err.message)));

      command.on("close", (code) => {
        if (code)
          reject({ message: `Error while executing command: ${cmd}`, code });
        resolve(buffer);
      });
    });

    return response;
  }

  /**
   * It generates a random string of a given length, using the characters a-z, A-Z, and 0-9
   * @param length - The length of the random string to be generated.
   * @returns A random string of length "length"
   */
  generateRandomAlphaNumericString(length) {
    let randomAlphaNumericString = "";
    let charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < length; i++)
      randomAlphaNumericString += charset.charAt(
        Math.floor(Math.random() * charset.length)
      );
    return randomAlphaNumericString;
  }
}

export const DateTimeHelper = {
  /**
   * It takes a timestamp and a format string and returns a formatted date string
   * @param [timestamp] - The timestamp to format. Defaults to Date.now()
   * @param [format=yyyy-MM-dd HH:mm:ss] - The format of the date you want to return.
   * @returns A string with the current date and time in the format "yyyy-MM-dd HH:mm:ss"
   */
  getFormattedDate(timestamp = Date.now(), format = "yyyy-MM-dd HH:mm:ss") {
    return DateTime.fromMillis(timestamp).toFormat(format);
  },

  /**
   * It takes a timestamp and a format string and returns a formatted date string
   * @param [timestamp] - The timestamp to format. Defaults to Date.now()
   * @param [format=yyyy-MM-dd HH:mm:ss] - The format of the date you want to return.
   * @returns A string with the current date and time in the format "yyyy-MM-dd HH:mm:ss"
   */
  getISOFormattedDate(timestamp) {
    return new DateTime(timestamp).toISO();
  },

  /**
   * It takes a timestamp and returns a date in the format mm/dd/yyyy
   * @docs https://moment.github.io/luxon/index.html#/
   * @param timestamp - The timestamp of the date you want to convert.
   * @returns The date in the format MM/dd/YYYY
   */
  getDateFromTimestamp(timestamp) {
    // locale is set to us by default, change locale by passing new DateTime(timestamp).setLocale('in').toLocaleString(DateTime.DATE_SHORT)
    return new DateTime(timestamp).toLocaleString(DateTime.DATE_SHORT);
  },
};
