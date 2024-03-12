import express from "express";
import { Request, Response, NextFunction } from "express";
import * as http from "http";
import { config } from "./config/config";
import { DB } from "./models/db";
var expressValidator = require("express-validator");
const XLSX = require("xlsx");
const multer = require("multer");
const CPUUtilize = require("./controllers/monitor");

var cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const db = new DB();
const port = config.port || 9090;
const mongodbURI =
  config.mongodbURI || "mongodb://localhost:27017/insuredmineAssessment";
const LABEL = config.serviceName;

app.set("port", port);
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

app.use("/test", (req, res) => {
  res.send(config.serviceName + "is LIVE");
});

db.connectWithRetry(mongodbURI);

//allow requests from any host
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Authorization, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use("/test", (req, res) => {
  res.send(config.serviceName + " is LIVE");
});

//Route Access
app.use("/v1", require("./routes/index"));

//start the server
server.listen(port, () => {
  console.log(LABEL + "is runnning on port " + port);
});

app.use(function (req: Request, res: Response, next: NextFunction) {
  res.status(404).send("Page/Api not found");
});

module.exports = app;
