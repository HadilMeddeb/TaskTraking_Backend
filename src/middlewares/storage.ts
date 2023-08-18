import { Request } from "express";

const multer = require('multer');

const diskStorage = multer.diskStorage({

destination: (req:Request, file: any, cb:Function) => {
    cb(null, 'images');
  },

filename: (req : Request, file :any , cb: Function) => {
    const mimeType = file.mimetype.split('/');
    const fileType = mimeType[1];
    const fileName = file.originalname + '.' + fileType;
    cb(null, fileName);
  },

});

const fileFilter = (req: Request, file:any, cb:CallableFunction) => {
  const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
};

export const storage = multer({ storage: diskStorage, fileFilter: fileFilter }).single('image');

