import express from "express";
import * as ControllersData from "../controllers/index";
import { entryPoint } from "../middleware/entryPoint";
import { exitPoint } from "../middleware/exitPoint";
const XLSX = require("xlsx");
const multer = require("multer");

let router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./bulkData");
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(
      null,
      file.fieldname +
        "-" +
        datetimestamp +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
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
router.post(
  "/bulkUpload",
  upload.single("file"),
  validate,
  ControllersData.bulkData
);

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
