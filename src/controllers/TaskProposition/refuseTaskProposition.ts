import { Request, Response } from "express";
import {
  BadRequestError,
  NotAuthorizedError,
} from "@portail_entreprise/common";
import "express-async-errors";
import { TaskProposition } from "../../models/Task_proposition";
//import { sendEmail } from "../../services/emailing/mailService";
import { sendEmail } from "../../middlewares/sendEmail";
export const refuseProposition = async (req: Request, res: Response) => {
  if (req.currentUser) {
    try {
      console.log("----------------> req.body ", req.body)
      req.body.propositions.forEach(async (element: any) => {
        const proposition = await TaskProposition.findOneAndUpdate(
          { _id: element.id },
          {
            status: "refusée",
            accepted: false,
            refuseReason: req.body.refuseReason,
          },
          { new: true }
        ).populate([
          {
            path: "id_responsable_validation",
            model: "WorkspaceMember",
          },
          {
            path: "id_creator",
            model: "WorkspaceMember",
          },
        ]);

        if (proposition) {
          const emailData = {
            subject: "Annulation d'une proposition de tache",
            content: `<p>sorry Gpro Consulting can't execute  ${proposition.title}
             for this reason  --> 
             <h3>Reason Of refuse :</h3> ${req.body.refuseReason}
             </p> `,
            recievers: [...proposition.email_beneficiaires],
          };
          const emailingResult = sendEmail(
            emailData.recievers,
            emailData.subject,
            emailData.content
          );
          console.log("emailingResult :", emailingResult);
        }
      });
      res
        .status(200)
        .json({ message: "propositions has been validated successfully " });
    } catch (err) {
      throw new BadRequestError(
        "something went wrong proposition has not been validated successfully try later !"
      );
    }
  }else
  {

    throw new NotAuthorizedError();
  }

};
