import { NotAuthorizedError } from "@portail_entreprise/common";
import { Request, Response ,NextFunction } from "express";

export const onlyAdmin =(
    req:Request,
    res:Response,
    next: NextFunction)=>{

if (!(req.currentUser?.role=="admin"))
{
    throw new NotAuthorizedError()
}
next()
}