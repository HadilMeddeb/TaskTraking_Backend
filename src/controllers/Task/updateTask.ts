import {
    BadRequestError,
    NotAuthorizedError,
  } from "@portail_entreprise/common";
  import { Request, Response } from "express";
import { Task } from "../../models/Task";

  //update proposition
  export const updateTask = async (req: Request, res: Response) => {
    if (req.currentUser) {
      try {
        const task = await Task.findById(req.params.id);
        if (task && (task.id_responsable == req.currentUser.id)) 
        {
          const taskResult = await task.updateOne(req.body, { new: true });
          res.status(200).send(taskResult);
        } else {
          throw new NotAuthorizedError();
        }
      } catch (err) {
        console.log("error :", err);
        throw new BadRequestError("something went wrong !");
      }
    } else {
      throw new NotAuthorizedError();
    }
  };
  