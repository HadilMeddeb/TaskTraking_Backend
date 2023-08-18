
import { Request, Response } from "express";



interface MulterRequest extends Request {
    file: any;
  }

export const uploadFiles = async (
    req: Request,
    res: Response,
    next: Function
  ) => {
    console.log("listen listen eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    console.log("888888888888888888888888888888888888888888",(req as MulterRequest).file.filename)
  };
  