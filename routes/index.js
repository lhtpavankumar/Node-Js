/**
 * Created by AyushK on 18/09/20.
 */
import ValidationManger from "../middleware/validation";
import { apiFailureMessage, stringConstants } from "../app/common/constants";
import Upload from "../app/modules/Upload";
import multer from "multer";
import fs from "fs";


const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads");
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  },
});
// const storage = multer.memoryStorage();

const upload = multer({
  storage: storage, limits: {
    fileSize: 1000000
  }, fileFilter: (req, file, cb) => {
    if (apiFailureMessage.SUPPORTED_FORMATS.includes(file.mimetype)) {
      cb(null, true);
    }
    else {
      console.log("FILe", file.mimetype)
      cb(new Error('File type not supported.'), false);
    }
} });

export default (app) => {
  app.get("/", (_req, res) => res.send(stringConstants.SERVICE_STATUS_HTML));

  /**
   * route definition
   */
  app.post("/upload", upload.single('file'), ValidationManger.validateUpload, new Upload().upload);
  
  app.post("/rename", ValidationManger.validateName, new Upload().rename)

  app.delete("/delete", ValidationManger.validateDelete, new Upload().delete);
};

