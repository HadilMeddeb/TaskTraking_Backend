import { Request, Response } from "express";
import {
  BadRequestError,
  NotAuthorizedError,
} from "@portail_entreprise/common";
import "express-async-errors";
import { Workspace } from "../../models/Workspace";
import { TaskProposition } from "../../models/Task_proposition";
import { WorkspaceMember } from "../../models/WorkspaceMember";

export const createTaskProposition = async (req: Request, res: Response) => {
  if (req.currentUser) {
    try {
      const workspace = await Workspace.findOne({ _id: req.body.id_workspace });
      if (!workspace) {
        throw new BadRequestError(
          "the corresponded workspace does not exist !"
        );
      }
      const proposition = await TaskProposition.build(req.body).save();
      if (!proposition) {
        throw new BadRequestError(
          "something went wrong task proposition has not been created !"
        );
      }
      const updatedWorkspace = await Workspace.findOneAndUpdate(
        {
          _id: proposition.id_workspace,
        },
        {
          $push: { taskPropositions: proposition._id },
        },
        { new: true }
      );
      const updatedMember = await WorkspaceMember.findOneAndUpdate(
        {
          _id: proposition.id_responsable_validation,
        },
        {
          $push: { PropositionsToValidate: proposition.id },
        },
        { new: true }
      );
      res.status(200).json(proposition);
    } catch (err) {
      console.log("error :", err);
      throw new BadRequestError("something went wrong !");
    }
  } else {
    throw new NotAuthorizedError();
  }
};

export const getTaskPropositions = async (req: Request, res: Response) => {
  const workspace = await Workspace.findById(req.params.id).populate({
    path: "taskPropositions",
    model: "TaskProposition",
    populate: [
      {
        path: "id_creator",
        model: "WorkspaceMember",
      },
      {
        path: "id_responsable_validation",
        model: "WorkspaceMember",
      },
    ],
  });
  if (workspace) {
    
    const propositions =  workspace.taskPropositions.filter((prop: any)=>{return prop.status!="false claim"})
     
    console.log("task propositions :", propositions);
    res.status(200).json(propositions);
  }
};


//Tasks To validate
export const getTasksToValidate = async (req: Request, res: Response) => {
  const propositions = await TaskProposition.find({
    id_workspace: req.params.workspace,
    id_responsable_validation: req.params.member,
    status: "à valider",
  }).populate([
    { path: "id_responsable_validation", model: "WorkspaceMember" },
    { path: "id_creator", model: "WorkspaceMember" },
  ]);
   res.status(200).json(propositions);
};


//Tasks To Clarify
export const getTasksToClarify = async (req: Request, res: Response) => {
  console.log("de88888888888888888888888888888888888fffffffffffffffffffffffeeeeeeeeggggggggg")
  console.log("member :",req.params.member)
  console.log("workspace : ",req.params.workspace)
  const propositions = await TaskProposition.find({
    id_workspace: req.params.workspace,
    id_creator: req.params.member,
    status: "à clarifier",
  }).populate([
    { path: "id_responsable_validation", model: "WorkspaceMember" },
    { path: "id_creator", model: "WorkspaceMember" },
  ]);
   res.status(200).json(propositions);
};




//getWorkspaceFalseClaims
export const getWorkspaceFalseClaims = async (req: Request, res: Response) => {
  const workspace = await Workspace.findById(req.params.id).populate({
    path: "taskPropositions",
    model: "TaskProposition",
    populate: [
      {
        path: "id_creator",
        model: "WorkspaceMember",
      },
      {
        path: "id_responsable_validation",
        model: "WorkspaceMember",
      },
    ],
  });
  if (workspace) {
    const propositions =  workspace.taskPropositions.filter((prop:any)=>{return prop.status=="false claim"})
    console.log("task propositions :", propositions);
    res.status(200).json(propositions);
  }
};
