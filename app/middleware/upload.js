const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const path = require("path");
const __basedir = path.resolve();

storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;