import { Client } from "../../models/Client";
import { Request, Response } from "express";

export const getAllClients = async (req: Request, res: Response) => {
    try {
      const categories = await Client.find()
      res.status(200).json(categories);
    } catch (error) {
      console.log("error :", error);
    }
  };