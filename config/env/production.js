export default {
  PORT: process.env.PORT || "3000",
  DB: process.env.DB || "",
  IS_DOCUMENT_DB: process.env.IS_DOCUMENT_DB || "false",
  RDS_FILE: process.env.RDS_FILE || "rds-combined-ca-bundle.pem",
  IS_CONSOLE_LOG: process.env.IS_CONSOLE_LOG || "false",
  S3_UNPROCESSED_BUCKET: process.env.S3_UNPROCESSED_BUCKET || '',
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || '',
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY || '',
};
