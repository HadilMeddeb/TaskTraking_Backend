import { Request, Response } from "express";
import { Client } from "../../models/Client";

export const addClient = async (req: Request, res: Response) => {
  try {
    console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
      const taskClient = await Client.findOne({
        name: req.body.name,
      });
      console.log("--------client------ :",taskClient )
      if (taskClient) {
        res.status(200).json({ message: "client already exist" });
      } else {
        const client = await Client.build({
          name: req.body.name,
          phones: req.body.phones,
          emails: req.body.emails,
          adress: req.body.adress,
        }).save();
        res.status(200).json(client);
        console.log("---------------------------- new client :", client)
      }
    
  } catch (error) {
    console.log("error :", error);
  }
};


