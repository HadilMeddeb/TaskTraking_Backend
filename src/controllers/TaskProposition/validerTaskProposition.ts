import { TaskProposition } from "../../models/Task_proposition";
import { Request, Response } from "express";
import { Member } from "../../models/Member";
import { BadRequestError } from "@portail_entreprise/common";

export const validerTache = async (req: Request, res: Response) => {
  const proposition = await TaskProposition.findById(req.params.id);
  const { start, end, dateEcheance } = req.body;
  if (proposition) {
    switch (proposition.categorie) {
      case "nouvelle": {
        try {
          const response = await TaskProposition.findOneAndUpdate(
            { id: req.params.id },
            {
              status: "à valider",
              accepted: false,
              idTask: null,
            }
          );
          const member = await Member.findOneAndUpdate(
            { id: proposition.id_responsable_validation },
            { $push: { listPropositionToValidate: proposition.id } }
          );
          res.status(200).send(response);
          //send him a notification that he has a proposition to validate
        } catch (err) {
          console.log("error :", err);
          throw new BadRequestError("something went wrong");
        }

        break;
      }
      default: {
        try {
          const task = await proposition.accept(start, end, dateEcheance);
          if (task) res.status(200).send(task);
        } catch (err) {
          console.log("error :", err);
          throw new BadRequestError("something went wrong");
        }

        break;
      }
    }
  }
};
