import {
  BadRequestError,
  NotAuthorizedError,
} from "@portail_entreprise/common";
import { Request, Response } from "express";
import { Task } from "../../models/Task";
import { WorkspaceMember } from "../../models/WorkspaceMember";

//get task
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id).populate([
      { path: "id_taskProposition", model: "TaskProposition", 
      populate: [
      { path: "id_creator", model :"WorkspaceMember" },
      { path: "id_responsable_validation", model :"WorkspaceMember" },
   
    ]},

      { path: "id_responsable", model: "WorkspaceMember" },
      { path: "id_workspace", model: "Workspace" },
      { path:"idFacturePrevisionnelle", model:"Facture" },
      { path:"idFactureFacturee", model:"Facture" },
      { path:"idFactureReelle", model:"Facture" },
      { path: "collaborators", model :"WorkspaceMember" },
      { path: "checkLists", model :"CheckList" },
      { path: "checkLists", model :"CheckList" ,    
       populate: [
        { path: "items", model :"UnderTask" ,
        populate: [
          { path: "collaborator", model :"WorkspaceMember" },
        ]
        },
      ]},
    ]);
    res.status(200).json(task);
  } catch (err) {
    console.log("error :", err);
    throw new BadRequestError("something went wrong !");
  }
};

//get task by Task prop
export const getTaskByTaskProp = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOne({
      id_taskProposition: req.params.id,
    }).populate({ path: "id_taskProposition", model: "TaskProposition" });
    res.status(200).json(task);
  } catch (err) {
    console.log("error :", err);
    throw new BadRequestError("something went wrong !");
  }
};
