import {
  BadRequestError,
  NotAuthorizedError,
} from "@portail_entreprise/common";
import { Request, Response } from "express";
import { TaskProposition } from "../../models/Task_proposition";



//update proposition
export const updateProposition = async (req: Request, res: Response) => {
  if (req.currentUser) {
    try {
      const prop = await TaskProposition.findById(req.params.id);
      if (prop?.id_creator == req.currentUser.id) {
        const proposition = await prop.updateOne(req.body, { new: true });
        res.status(200).send(proposition);
      } else {
        throw new NotAuthorizedError();
      }
    } catch (err) {
      console.log("error :", err);
      throw new BadRequestError("something went wrong !");
    }
  } else {
    throw new NotAuthorizedError();
  }
};

//false Claim
export const falseClaim = async (req: Request, res: Response) => {
  if (req.currentUser) {
    try {
      const prop = await TaskProposition.findById(req.params.id);
    if(prop)
    {
      if (prop.id_creator == req.currentUser.id) {
        await TaskProposition.findOneAndUpdate({ _id: req.params.id },{status: "false claim"});
        res.status(200).send(prop);
      } else {
        throw new NotAuthorizedError();
      }
    }
    } catch (err) {
      console.log("error :", err);
      throw new BadRequestError("something went wrong !");
    }
  } else {
    throw new NotAuthorizedError();
  }
};

export const getTaskPropositionById= async (req:Request,res:Response)=>{
const proposition = await  TaskProposition.findById(req.params.id).populate([
  {
    path: "id_creator",
    model: "WorkspaceMember",
  },
  {
    path: "id_workspace",
    model: "Workspace",
  },
]);
console.log("proposition", proposition)
res.status(200).json(proposition)
}


