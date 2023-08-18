import { List } from "../../models/BoardTrelloList";
import { Request, Response } from "express";



export const deleteList = async (req: Request, res: Response) => {
    try {
        
        const list = await List.deleteOne({ _id: req.params.id });
        res.status(200).json(list);    
 
    } catch (error) {
      console.log("error :", error);
    }
  };