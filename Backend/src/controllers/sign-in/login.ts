import { Request, Response, NextFunction } from "express";
import { ErrorCodes } from "../../models/models";
import * as DynamicModel from "../../models/dynamicModels";
import { config } from "../../config/config";

const multer = require("multer");
const XLSX = require("xlsx");
const Config = new config();
