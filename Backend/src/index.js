"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const config_1 = require("./config/config");
const db_1 = require("./models/db");
var expressValidator = require("express-validator");
const XLSX = require("xlsx");
const multer = require("multer");
const CPUUtilize = require("./controllers/monitor");
var cors = require("cors");
require("dotenv").config();
const app = (0, express_1.default)();
const server = http.createServer(app);
const db = new db_1.DB();
const port = config_1.config.port || 9090;
const mongodbURI = config_1.config.mongodbURI ||
    "mongodb+srv://bharath:%21%40%23Bharath790@cluster0.v9fdrlb.mongodb.net/conventionHall?retryWrites=true&w=majority";
const LABEL = config_1.config.serviceName;
app.set("port", port);
app.use(express_1.default.json({ limit: "100mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "100mb" }));
app.use("/test", (req, res) => {
    res.send(config_1.config.serviceName + "is LIVE");
});
// Example in Express backend
app.use(cors({
    origin: "http://localhost:3000", // Your Next.js app
    methods: ["GET", "POST"],
    credentials: true,
}));
db.connectWithRetry(mongodbURI);
//allow requests from any host
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
app.use("/test", (req, res) => {
    res.send(config_1.config.serviceName + " is LIVE");
});
//Route Access
// app.use("/v1", require("./routes/index"));
app.use("/v1", require("./routes/sign-up/sign-up"));
//start the server
server.listen(port, () => {
    console.log(LABEL + "is runnning on port " + port);
});
app.use(function (req, res, next) {
    res.status(404).send("Page/Api not found");
});
module.exports = app;
function injectRoutes() {
    throw new Error("Function not implemented.");
}
//# sourceMappingURL=index.js.map