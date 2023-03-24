import fs from "fs";
import csv from "csv-parser";
import path from "path";
import { createObjectCsvWriter } from "csv-writer";

export default class BLManager {
  async verifyCSV(_requestData) {
    // Set the input and output file paths
    const inputFile = path.resolve(__dirname, "./input.csv");

    const outputFile = "./output.csv";

    // Create a new CSV writer object
    const updatedFile = createObjectCsvWriter({
      path: outputFile,
      header: [
        { id: "Name", title: "Name" },
        { id: "Password", title: "Password" },
      ],
    });
    let data = [];

    try {
      // Use the csv-parser library to read the input CSV file
      await new Promise((resolve, reject) => {
        fs.createReadStream(inputFile)
          .pipe(csv())
          .on("data", (row) => {
            console.log("ROW", row);
            // Check if the row already has a password
            if (!row.Password) {
              // Generate a new password
              const newPassword = generateNewPassword(12);
              console.log("newPassword", newPassword);

              // Add the new password to the row
              row.Password = newPassword;
            }
            data.push(row);
          })
          .on("end", () => {
            console.log("DATA------", data);
            if (data.length <= 0) {
              console.log("Working");
              reject("Empty File");
            }
            // Write the updated data to the output CSV file
            updatedFile.writeRecords(data).then(() => {
              console.log("CSV file successfully updated");
              resolve("CSV file successfully updated");
            });
          })
      })
      return "CSV file successfully updated";
    }
    catch (e) {
      throw e;
    }
  }
}

// Function to generate a new password
const generateNewPassword = (length) => {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numericChars = "0123456789";
  const symbolChars = "!@#$%^&*";

  let allChars = lowercaseChars + uppercaseChars + numericChars + symbolChars;
  let password = "";

  for (let i = 0; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }
  console.log("Password", password);

  return password;
};
