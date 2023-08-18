import {
  BadRequestError,
  NotAuthorizedError,
} from "@portail_entreprise/common";
import { Request, Response } from "express";
import { Member } from "../../models/Member";
import { Workspace } from "../../models/Workspace";

export const getCurrentMember = async (req: Request, res: Response) => {
  try {
    console.log("here we are ")
    if (req.currentUser) {
      console.log("here we are  2 ",req.currentUser)
      const member =await Member.findOne({ id_user: req.currentUser.id  }).populate({
        path : 'workspacesMembership',
        populate : {
          path : 'members'
        }
      }).populate("workspacesMembership")
      res.status(200).json(member)
    }
    else {
      throw new NotAuthorizedError();
    }
    
  } catch (error) {
console.log("error :",error)

  }
};
