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
const ControllersData = __importStar(require("../controllers/index"));
const XLSX = require("xlsx");
const multer = require("multer");
let router = express_1.default.Router();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./bulkData");
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname +
            "-" +
            datetimestamp +
            "." +
            file.originalname.split(".")[file.originalname.split(".").length - 1]);
    },
});
var upload = multer({
    storage: storage,
});
function validate(req, res, next) {
    if (!req.file) {
        return res.send({
            errors: {
                message: "file cant be empty",
            },
        });
    }
    next();
}
//Task related APIs
router.post("/bulkUpload", upload.single("file"), validate, ControllersData.bulkData);
router.post("/searchByUserName/:id", ControllersData.searchByUserName);
router.post("/aggregateData", ControllersData.aggregatedPolicyWithUser);
router.post("/addMessage", ControllersData.messageAlert);
//CRUD operation
router.post("/addData", ControllersData.createData);
router.get("/getAllData", ControllersData.getData);
router.post("/getOneData/:id", ControllersData.getOneData);
router.put("/updateData/:id", ControllersData.UpdateData);
router.delete("/deleteData/:id", ControllersData.deleteData);
module.exports = router;
//# sourceMappingURL=index.js.map