import { List } from "../../models/BoardTrelloList";
import { Request, Response } from "express";
import { Client } from "../../models/Client";
import { Project } from "../../models/Project";



export const deleteClient = async (req: Request, res: Response) => {
    try {
        const client = await Client.deleteOne({ _id: req.params.id });
        const project = await Project.deleteOne({ client: req.params.id });
        
        res.status(200).json(client);    
     
    } catch (error) {
      console.log("error :", error);
    }
  };