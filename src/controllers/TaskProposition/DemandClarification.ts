import { BadRequestError, NotAuthorizedError } from "@portail_entreprise/common";
import { Request, Response } from "express";
import { TaskProposition } from "../../models/Task_proposition";
import { WorkspaceMember } from "../../models/WorkspaceMember";

export const demandClarificationPropositions = async (
  req: Request,
  res: Response
) => {
  if (req.currentUser) {
    console.log("-----------------------------*******************************> ", req.body)
  try {
    req.body.propositions.forEach(async (element: any) => {
      const proposition = await TaskProposition.findOneAndUpdate(
        { _id: element.id },
        {
          status: "à clarifier",
          accepted: false,
          idTask: null,
        },
        { new: true }
      );
      if (proposition) {
        await WorkspaceMember.findOneAndUpdate(
          { _id: proposition.id_creator },
          {
            $push: { PropositionsToClarify: proposition._id },
          },
          { new: true }
        );
        const member = await WorkspaceMember.findOneAndUpdate(
          { _id: proposition.id_responsable_validation },
          {
            $pull: { PropositionsToValidate: proposition.id },
          },
          { new: true }
        );
      }
      res
      .status(200)
      .json({ message: "propositions has been validated successfully" });
    });
  } catch (err) {
    console.log("error :", err);
    throw new BadRequestError("something went wrong !");
  }}else{
    throw new NotAuthorizedError();
  }
};
