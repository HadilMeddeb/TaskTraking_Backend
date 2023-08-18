import { Request } from "express";
const multer = require("multer");
const fs = require("fs");
const dir = "./src/uploads/profile_images";


const storage = multer.diskStorage({
  destination: function (req : Request, file: File, callback : Function) {
    console.log("111111111111111111111111111111111111111", file)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    callback(null, "./src/uploads/profile_images");
  },
  filename: function (req :Request, file : any, callback : Function) {
    console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee :", file)
    callback(null, Date.now() + "-" + file.originalname);
  },
});



const fileFilter = (req :Request, file : any, callback: Function) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    "application/pdf"
  ) {
    console.log("---------- file file file file file :", file)
    //mimetype of the file
    callback(null, true);
  } else {
    callback(null, false);
  }
};

export const upload = multer({ storage: storage, fileFilter: fileFilter });
