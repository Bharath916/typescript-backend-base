import multer from "multer";
import path from "path";
// import { Config } from "../config/config";

// const config = new Config();

// filter the files
function checkFileType(file, cb) {
  const fileTypes = /csv/; // Allowed extension
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase()); // check extension
  const mimeType = fileTypes.test(file.mimetype); // check mime type

  if (extName && mimeType) {
    return cb(null, true);
  } else {
    const err = file.originalname + ",should be of type csv";
    return cb(err, null);
  }
}

// method to upload files in req object
const uploadFiles = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    checkFileType(file, cb);
  },
//   limits: {
//     fileSize: config.fileMaxSize, // max file size allowed to upload
//     files: config.fileUploadPerRequest, // total no files allowed to upload per request;
//   },
});

export const multerUploadFiles = uploadFiles.any();
