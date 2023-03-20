// import JobController from "../app/modules/jobs";
import cron from "node-cron";
import LHTLogger from "../app/utils/logger";
import fs from "fs";

/*
  ┌────────────── second(optional)
  │ ┌──────────── minute
  │ │ ┌────────── hour
  │ │ │ ┌──────── day of month
  │ │ │ │ ┌────── month
  │ │ │ │ │ ┌──── day of week
  * * * * * *
*/
cron.schedule("*/60 * * * * *", async () => {
  LHTLogger.info("Cron:schedule", "cron job running");
  // Data to write on file
  let data = `${new Date().toUTCString()} : Server is working\n`;

  // Appending data to logs.txt file
  fs.appendFile("logs.txt", data, function (err) {
    if (err) throw err;

    console.log("Status Logged!");
  });
});
