import { Request, Response } from "express";
import { Client } from "../../models/Client";
import { Project } from "../../models/Project";

export const addProject = async (req: Request, res: Response) => {
  try {
      
      const projects = await Project.find(
        {$or: [
          { name: req.body.name },
          { gitLink: req.body.gitLink }
        ]});
    
        console.log("projects :++++++++++", projects)
      if (projects.length>0) {
        res.status(200).json({ error: "project already exist gitlink and project name should be unique !" });
      } else {


        console.log("eeeeeeeeeeeeeeeee :", {
          name: req.body.name,
          gitLink: req.body.gitLink,
          demoServerURL: req.body.demoServerURL,
          client:req.body.client,
          idWorkspace : req.body.idWorkspace 

        })
        const project = await Project.build({
          name: req.body.name,
          gitLink: req.body.gitLink,
          demoServerURL: req.body.demoServerURL,
          client:req.body.client,
          idWorkspace : req.body.idWorkspace 
        }).save();
        res.status(200).json(project);
        console.log("---------------------------- new project :", project)
      }
    
  } catch (error) {
    console.log("error :", error);
  }
};


