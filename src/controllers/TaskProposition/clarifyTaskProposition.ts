import { BadRequestError } from "@portail_entreprise/common";
import { Request, Response } from "express";
import { TaskProposition } from "../../models/Task_proposition";

export const clarifyPropositions = async (req: Request, res: Response) => {
  try {
    console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
    const proposition = await TaskProposition.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: { clarifications: req.body.clarification },
        status: "à valider",
        accepted: false,
        idTask: null,
      },
      { new: true }
    );
    res.status(200).send(proposition);
  } catch (err) {
    console.log("error :", err);
    throw new BadRequestError("something went wrong !");
  }
};
