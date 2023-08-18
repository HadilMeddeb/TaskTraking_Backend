import { Category } from "../../models/TaskCategory";
import { Request, Response } from "express";



export const deleteCategory = async (req: Request, res: Response) => {
    try {
    
        const categories = await Category.deleteOne({ _id: req.params.id });
        res.status(200).json(categories);    
     
    } catch (error) {
      console.log("error :", error);
    }
  };