import express from "express";
import * as ControllersData from "../../controllers/sign-up/sign-up";
import { entryPoint } from "../../middleware/entryPoint";
import { exitPoint } from "../../middleware/exitPoint";
const XLSX = require("xlsx");
const multer = require("multer");

let router = express.Router();

//Implement file related code later

//Sign-Up related APIs
router.post("/create", ControllersData.createUserRegister);
router.post("/login", ControllersData.login);

module.exports = router;
