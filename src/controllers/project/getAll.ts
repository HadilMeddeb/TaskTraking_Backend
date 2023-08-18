import { Request, Response } from "express";
import { Project } from "../../models/Project";

export const getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find().populate({
        path :"client",
        model:"Client"
      })
      res.status(200).json(projects);
        
    } catch (error) {
      console.log("error :", error);
    }
  };






  export const  getAllWorkspaceProjects= async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({idWorkspace:req.params.workspace}).populate({
        path :"client",
        model:"Client"
      })
      res.status(200).json(projects);
        
    } catch (error) {
      console.log("error :", error);
    }
  };