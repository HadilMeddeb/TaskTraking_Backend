import { List } from "../../models/BoardTrelloList";
import { Request, Response } from "express";
import { Project } from "../../models/Project";



export const deleteProject = async (req: Request, res: Response) => {
    try {
      console.log("------------------ req.params.id :",req.params.id)
        const project = await Project.deleteOne({ _id: req.params.id });
        res.status(200).json(project);    
     
    } catch (error) {
      console.log("error :", error);
    }
  };