import { Request, Response } from "express";
import { List } from "../../models/BoardTrelloList";

export const addList = async (req: Request, res: Response) => {
  try {
      const list = await List.findOne({
        listName: req.body.listName,
      });
      if (list) {
        res.status(200).json({ message: "list name already exist" });
      } else {
        const resultedlist = await List.build({
          listName: req.body.listName,
        }).save();
        res.status(200).json(resultedlist);
        console.log("---------------------------- new list :", resultedlist)
      }
  } catch (error) {
    console.log("error :", error);
  }
};


