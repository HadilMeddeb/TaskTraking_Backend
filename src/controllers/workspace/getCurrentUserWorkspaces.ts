import {
  BadRequestError,
  NotAuthorizedError,
} from "@portail_entreprise/common";
import { Request, Response } from "express";
import { Workspace } from "../../models/Workspace";
import { WorkspaceMember } from "../../models/WorkspaceMember";

export const getCurrentUserWorkspaces = async (req: Request, res: Response) => {
  console.log(
    "------------------------------------------------****************------------------------------------------------------"
  );
  if (req.currentUser) {
    try {
      console.log(
        "------------------------------------------------****************------------------------------------------------------"
      );
      const member = await WorkspaceMember.findOne({
        _id: req.currentUser.id,
      }).populate({
        path: "workspacesMembership",
        populate: [
          {
            path: "idResponsable",
            model: "WorkspaceMember",
          },
          {
            path: "members",
            model: "WorkspaceMember",
          },
        ],
      });


      console.log("7777777777777777777777777777777777777777777777777777777777777777778888888", member)
      if (member) {
        res.status(200).json(member.workspacesMembership);
      } else {
        throw new BadRequestError("there is no associated member");
      }
    } catch (error) {
      console.log("error :", error);
    }
  } else {
    throw new NotAuthorizedError();
  }
};

export const getAllWorkspaces = async (req: Request, res: Response) => {

    try {
      const workspaces = await Workspace.find({})
      res.status(200).json(workspaces);
    } catch (error) {
      console.log("error :", error);
    }

};


export const getCurrentResponsibleWorkspaces = async (req: Request, res: Response) => {
  if (req.currentUser) {
    try {
      console.log(
        "------------------------------------------------****************------------------------------------------------------", req.params.id
      );
      const workspaces = await Workspace.find({
        idResponsable: req.params.id,
      }).populate([
          {
            path: "idResponsable",
            model: "WorkspaceMember",
          },
          {
            path: "members",
            model: "WorkspaceMember",
          },
        ]);
      console.log("7777777777777777777777777777777777777777777777777777777777777777778888888", workspaces)
  res.status(200).json(workspaces)
  
    } catch (error) {
      console.log("error :", error);
    }
  } else {
    throw new NotAuthorizedError();
  }
};