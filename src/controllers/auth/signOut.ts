import {Request,Response} from "express";

//controllers

export const signOutController=(req:Request, res:Response) => {
  console.log("req session 1:", req.session)
  req.session=null
  console.log("req session 2 :", req.session)
  res.json({})
}


