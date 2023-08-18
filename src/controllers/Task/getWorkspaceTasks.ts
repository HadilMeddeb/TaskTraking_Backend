import {
  BadRequestError,
  NotAuthorizedError,
} from "@portail_entreprise/common";
import { Request, Response } from "express";
import { Task } from "../../models/Task";

//get workspace Tasks
export const getWorkspaceTasks = async (req: Request, res: Response) => {
  //if (req.currentUser) {
  try {
    const tasks = await Task.find({ id_workspace: req.params.id }).populate([
      { path: "id_taskProposition", model: "TaskProposition" },
      { path: "idFacturePrevisionnelle", model: "Facture" },
      { path: "id_responsable", model: "WorkspaceMember" },
      { path: "id_workspace", model: "Workspace" },
    
      
    ]);
    res.status(200).json(tasks);
  } catch (err) {
    console.log("error :", err);
    throw new BadRequestError("something went wrong !");
  }
  /* } else {
      throw new NotAuthorizedError();
    }*/
};
