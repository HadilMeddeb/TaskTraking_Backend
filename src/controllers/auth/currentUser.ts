
import { Request, Response } from "express";


//controllers
export const currentuserController =(req:Request, res:Response) => {
    console.log("currrrrrrrrrrrrrrrrrrrrrrrrrr :",req.currentUser)
    res.status(200).json({currentUser:req.currentUser|| null})
   }




