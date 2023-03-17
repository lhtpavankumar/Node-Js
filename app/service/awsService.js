import config from "../../config/index";
import AWS from "aws-sdk";
import fs from "fs";
import LHTLogger from "../utils/logger";

const s3Bucket = new AWS.S3();
AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY,
  secretAccessKey: config.AWS_SECRET_KEY,
});

/**
 * It uploads a file to S3
 * @param file - The file path of the file to be uploaded
 * @param Key - The name of the file in S3
 * @param [Bucket] - The name of the bucket to upload to.
 * @returns The response from the S3 upload.
 */
export const uploadFileToS3 = async (file, Key, Bucket = config.S3_UNPROCESSED_BUCKET) => {
  if (!file || !Key) {
    throw new Error('Invalid arguments');
  }

  try {
    const Body = fs.readFileSync(file);
    if (!Body) {
      throw new Error('Error reading file');
    }
    
    const params = { Bucket, Key, Body };
    const response = await s3Bucket.upload(params).promise();
    LHTLogger.info("awsService:downloadFromS3", `Finished uploading the File: ${Key}`);
    return response;
  } catch (error) {
    LHTLogger.error("awsService:uploadFileToS3", error.message, {}, error.stack, "Guna R");
    throw new Error(`Error uploading file: ${error.message}`);
  }
};

/**
 * It downloads a file from S3 and saves it to the local file system
 * @param path - The path where you want to save the file.
 * @param Key - The name of the file in the S3 bucket.
 * @param [Bucket] - The bucket name from which the file is to be downloaded.
 * @returns a promise.
 */
export const downloadFromS3 = async (path, Key, Bucket = config.S3_UNPROCESSED_BUCKET) => {
  if (!path || !Key) {
    throw new Error('Invalid arguments');
  }

  try {
    const data = await s3Bucket.getObject({ Bucket, Key }).promise();
    fs.writeFileSync(path, data.Body);
    LHTLogger.info("awsService:downloadFromS3", `Finished Saving the File: ${Key}`);
    return;
  } catch (error) {
    LHTLogger.error("awsService:downloadFromS3", error.message, {}, error.stack, "Guna R");
    throw error;
  }
};
