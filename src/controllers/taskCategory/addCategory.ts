import { Request, Response } from "express";
import { Category } from "../../models/TaskCategory";

export const addCategory = async (req: Request, res: Response) => {
  try {
    
      const taskCategory = await Category.findOne({
        designation: req.body.designation,
      });
      if (taskCategory) {
        res.status(200).json({ error: "category already exist" });
      } else {
        const category = await Category.build({
          designation: req.body.designation,
        }).save();
        res.status(200).json(category);
        console.log("---------------------------- new category :", category)
      }
    
  } catch (error) {
    console.log("error :", error);
  }
};


