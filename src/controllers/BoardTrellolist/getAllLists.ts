import { Request, Response } from "express";
import { List } from "../../models/BoardTrelloList";

export const getAlllists = async (req: Request, res: Response) => {
    try {
      const lists = await List.find()
      res.status(200).json(lists);
    } catch (error) {
      console.log("error :", error);
    }
  };