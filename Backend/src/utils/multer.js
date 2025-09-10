"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUploadFiles = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// import { Config } from "../config/config";
// const config = new Config();
// filter the files
function checkFileType(file, cb) {
    const fileTypes = /csv/; // Allowed extension
    const extName = fileTypes.test(path_1.default.extname(file.originalname).toLowerCase()); // check extension
    const mimeType = fileTypes.test(file.mimetype); // check mime type
    if (extName && mimeType) {
        return cb(null, true);
    }
    else {
        const err = file.originalname + ",should be of type csv";
        return cb(err, null);
    }
}
// method to upload files in req object
const uploadFiles = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    fileFilter: (_req, file, cb) => {
        checkFileType(file, cb);
    },
    //   limits: {
    //     fileSize: config.fileMaxSize, // max file size allowed to upload
    //     files: config.fileUploadPerRequest, // total no files allowed to upload per request;
    //   },
});
exports.multerUploadFiles = uploadFiles.any();
//# sourceMappingURL=multer.js.map