import { Category } from "../../models/TaskCategory";
import { Request, Response } from "express";

export const getAllCategories = async (req: Request, res: Response) => {
    try {
      const categories = await Category.find()
      res.status(200).json(categories);
    } catch (error) {
      console.log("error :", error);
    }
  };