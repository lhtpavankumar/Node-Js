import JobController from "../app/modules/jobs";
import cron from "node-cron";
import LHTLogger from "../app/utils/logger";

/*
  ┌────────────── second(optional)
  │ ┌──────────── minute
  │ │ ┌────────── hour
  │ │ │ ┌──────── day of month
  │ │ │ │ ┌────── month
  │ │ │ │ │ ┌──── day of week
  * * * * * *
*/
cron.schedule('0 1 * * *', async () => {
  LHTLogger.info("Cron:schedule", "cron job running");
  await JobController.monitorMeter();
});
