import axios from "axios";
import { Request, Response } from "express";
import { Task } from "../../models/Task";
import { TaskProposition } from "../../models/Task_proposition";
import { Workspace } from "../../models/Workspace";
import { configData } from "../../config/ConfigData";
import { WorkspaceMember } from "../../models/WorkspaceMember";
import { BadRequestError, NotAuthorizedError } from "@portail_entreprise/common";
import { Facture } from "../../models/Facture";

export const acceptTaskProposition = async (req: Request, res: Response) => {
  if (req.currentUser) {
    try {
      req.body.propositions.forEach(async (prop: any) => {
        const proposition = await TaskProposition.findById({ _id: prop.id });
        if (proposition) {
          //build the task
          const task = await Task.build({
            id_taskProposition: proposition?.id,
            id_workspace: proposition.id_workspace,
            name: proposition.title,
            description: proposition.description,
            id_responsable: proposition.id_responsable_validation,
            paimentStatus: req.body.paimentStatus,
            relatedProject: proposition.relatedProject
          }).save();
          console.log("--------------- created Task ---------------", task);
          //update proposition status on accepted
          const updatedprop = await proposition.updateOne(
            {
              status: "acceptée",
              accepted: true,
            },
            { new: true }
          );
          // supprimer la proposition de la liste des task à valider
          const member = await WorkspaceMember.findOneAndUpdate(
            { _id: proposition.id_responsable_validation },
            {
              $pull: { PropositionsToValidate: proposition.id },
            },
            { new: true }
          );
          //integrate the task in trello

          /*
      const workspace = await Workspace.findById(proposition.id_workspace);
      if (workspace) {
        const response = await axios.post(
          `${configData.baseURL}/cards?idList=${workspace?.idInitialList}&${configData.auth}`,
          {
            name: proposition.title,
            desc: proposition.description,
            idList: workspace.idInitialList,
          }
        );
  
        //create the webhook on card to get news
        const cardWebhook = await axios.post(
          `${configData.baseURL}webhooks/?callbackURL=${configData.webhookResponse}&idModel=${response.data.id}&${configData.auth}`
        );
  
        const resultedTask = await task.updateOne(
          {
            idTrelloCard: response.data.id,
            idCardWebhhok: cardWebhook.data.id,
            CardTrelloUrl: response.data.shortUrl,
          },
          { new: true }
        );
  console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd", task)
        res.status(200).json(task);
      }
      */
        }
      });
      res
        .status(200)
        .json({ message: "Propositions has been accepted successfully" });
    } catch (err) {
      console.log("error :", err);
      throw new BadRequestError(`something went wrong : ${err}`);
    }
  } else {
    throw new NotAuthorizedError();
  }
};
