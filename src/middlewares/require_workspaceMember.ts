import { BadRequestError } from "@portail_entreprise/common";
import { NextFunction,Request,Response } from "express";

export const requireMemberWorkspace =(
    req:Request,
    res:Response,
    next: NextFunction)=>{
        if(!req.currentWorkspace||!req.currentMember)
        {
        throw new BadRequestError("no workspace or no member there")
        }
        next()
}