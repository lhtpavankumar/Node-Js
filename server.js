import express from "express";

const app = express();

app.get("/", (req, res) => {
  let out = req.query.name;

  let promise = new Promise((resolve, reject) => {
    if (out !== undefined && out !== "") {
      resolve("Hello " + out + ", nice to see u here");
    } else {
      reject("Check or Add Inputs");
    }
  });

  promise
    .then((response) => {
      res.status(200).json({ Success: response });
    })
    .catch((err) => {
      res.status(400).json({ error: ` ${err}` });
    });
});

app.listen(3000, () => {
  console.log("Server Started");
});
