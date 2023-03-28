import fs from "fs";
// import csv from "csv-parser";
import path from "path";
// import { createObjectCsvWriter } from "csv-writer";
import crypto from "crypto";

export default class BLManager {
  async verifyCSV(_requestData) {
    // Set the input and output file paths
    const inputFile = path.resolve(__dirname, "../../../input.csv"); // TODO :

    try {
      await new Promise((resolve, reject) => {
        if (!fs.existsSync(inputFile)) {
          reject("Empty File");
        }
        let lines = readInputFile(inputFile);
        console.log("LINES", lines);
        let results = checkAndGenerateNewPassword(lines);
        console.log("RESULTS", results);
        pushUpdatedDataToANewCSVFile(results);
        resolve();
      });
      return "CSV FILE UPDATED SUCCESFULLY";
    } catch (e) {
      throw e;
    }
  }
}

// Function to generate a new password
const generateNewPassword = (length) => {
  // Create a buffer to store the random bytes
  const buffer = crypto.randomBytes(length);

  // Convert the buffer to a string using base64 encoding
  const password = buffer.toString("base64");

  // Return the password
  return password;
};

const readInputFile = (inputFile) => {
  const data = fs.readFileSync(inputFile, "utf8");
  const lines = data.trim().split(/\r?\n/);
  console.log("lines", lines);

  // get the header row (first row) of the CSV
  const rowSliced = lines.slice(1);

  if (rowSliced <= 0) {
    console.log("WORKING AT ROWSLICED");
    throw "EMPTY FILE";
  }

  return lines;
};

const checkAndGenerateNewPassword = (data) => {
  const updatedCSVData = [];
  console.log("DATA", data);

  data.forEach((line) => {
    const fields = line.split(",");
    updatedCSVData.push(fields);
  });

  updatedCSVData.forEach((row) => {
    if (!row[1]) {
      const newPassword = generateNewPassword(6);
      row[1] = newPassword;
    }
  });
  console.log("updatedCSVData", updatedCSVData);

  return updatedCSVData;
};

const pushUpdatedDataToANewCSVFile = async (data) => {
  const csvData = data.map((row) => row.join(",")).join("\n");
  try {
    fs.writeFileSync("./output.csv", csvData);
  } catch (e) {
    throw e;
  }

  return true;
};
