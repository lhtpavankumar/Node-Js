import LHTLogger from "../../utils/logger"

export default class BLManager {
  async monitorMeters () {
    // Cron Job Business logic-
    LHTLogger.info("JobManager:monitorMeters", "monitoring");
    return true
  }
}
