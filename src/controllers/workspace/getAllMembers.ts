import { NotAuthorizedError } from "@portail_entreprise/common";
import { Request, Response } from "express";
import { Workspace } from "../../models/Workspace";
import { WorkspaceMember } from "../../models/WorkspaceMember";

export const getAllMembersNotInWorkspace = async (req: Request, res: Response) => {
  try {
 //  if (req.currentUser) {
      const workspace= await Workspace.findById(req.params.id)
      console.log("rrrrrrrrrrr*****************",workspace)
      if(workspace)
      {
        console.log("rrrrrrrrrrr",workspace.members)
        const members = await WorkspaceMember.find()
        console.log("99999999999999 :",members.map((member)=>{return member._id}) )
        members.map((member)=>{if(!workspace.members.includes(member._id)){console.log("does not exist ! ")}else{console.log("it does exist !")}})
        console.log('members ',members);
        const result = members.filter((member)=>{return !workspace.members.includes(member._id)})
        res.status(200).json(result);
      }
   /* } else {
      throw new NotAuthorizedError();
    }*/
  } catch (error) {
    console.log("error :", error);
  }
};

export const getAllMembersInWorkspace = async (req: Request, res: Response) => {
  try {
  //  if (req.currentUser) {
      const workspace= await Workspace.findById(req.params.workspace).populate({
        path: "members",
        model: "WorkspaceMember"
      })
      if(workspace)
      {
        res.status(200).json(workspace.members);
      }
   /* } else {
      throw new NotAuthorizedError();
    }*/
  } catch (error) {
    console.log("error :", error);
  }
};

