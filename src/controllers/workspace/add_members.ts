import { Request, Response } from "express";
import { BadRequestError, NotAuthorizedError } from "@portail_entreprise/common";
import "express-async-errors";
import { Workspace } from "../../models/Workspace";
import { WorkspaceMember } from "../../models/WorkspaceMember";

export const AddMember = async (req: Request, res: Response) => {
    console.log("--------------------AddMember-------------------------------",req.body)
  const workspace = await Workspace.findById(req.params.id);
  if (!workspace) {
    throw new BadRequestError("no workspace with this id !");
  }

  req.body.members.forEach(
    async (member: string) => {
      console.log("member.id :",member)
      const findedMember = await WorkspaceMember.findOne({ _id: member });
   console.log("findedMember :",findedMember)

   //making updates starting from the founded member 

   if (findedMember) {
        console.log("workspace.members.indexOf(findedMember._id)  :",workspace.members.indexOf(findedMember._id) )
        if ( workspace.members.indexOf(findedMember._id) != -1) {
        
          throw new BadRequestError("member already exist ");
        }
    
        await workspace.updateOne(
          { $push: { members: findedMember._id  } },
          {new:true}
        )
        workspace.save();
        console.log("updated workspaces :", workspace)
        await findedMember.updateOne(
          { $push: { workspacesMembership: workspace.id  } },
          {new:true}
        )
        findedMember.save();
        console.log("updated findedMember :", findedMember)
      }
// add the member to the organisation
    }
  );
res.status(200).json(workspace)

 
};
