import * as functions from "firebase-functions";
import * as express from "express";
import * as entryController from "../controllers/entryController";

const app = express();

app.get("/", (req, res) =>
  res.status(200).send("...This is not the API you are looking for...")
);
app.post("/entries/create", entryController.createEntry);
app.post("/entries/update", entryController.updateEntry);
app.get("/entries/getall", entryController.getAllEntries);
app.get("/entries/get", entryController.getEntry);
app.post("/entries/delete", entryController.deleteEntry);

exports.app = functions.https.onRequest(app);
