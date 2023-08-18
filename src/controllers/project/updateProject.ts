import { BadRequestError} from "@portail_entreprise/common";
import { Request, Response } from "express";
import { Project } from "../../models/Project";
  
  
export const updateProject = async (req: Request, res: Response) => {

    try {
        const project = await Project.findOneAndUpdate({_id:req.params.id},req.body, { new: true });
        res.status(200).json(project)
      } catch (err) {
        console.log("error :", err);
        throw new BadRequestError("something went wrong !");
      }
};
  
  
  

  
  
  
  
  
  
  
