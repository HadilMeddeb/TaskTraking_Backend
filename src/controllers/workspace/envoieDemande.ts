import {
  BadRequestError,
  NotAuthorizedError,
} from "@portail_entreprise/common";
import { Request, Response } from "express";
import { sendEmail } from "../../middlewares/sendEmail";
import { Demande } from "../../models/Demande";
import { Workspace } from "../../models/Workspace";
import { WorkspaceMember } from "../../models/WorkspaceMember";

export const envoieDemandeJoindre = async (req: Request, res: Response) => {
  try {
    const workspace = await Workspace.findById(req.params.workspace);
    if (workspace && workspace.members.indexOf(req.params.member) != -1) {
      res
        .status(200)
        .json({ error: "you are already a member in this workspace " });
    } else {
      const listDemande = await Demande.find({
        workspace: req.params.workspace,
        member: req.params.member,
      });

      console.log("req.params.workspace :", req.params.workspace);
      console.log("req.params.member :", req.params.member);

      console.log("demande ------------------- ", listDemande);
      if (listDemande.length == 0) {
        const demande = await Demande.build({
          member: req.params.member,
          workspace: req.params.workspace,
          message: req.body.messsage,
        }).save();

        res.status(200).json(demande);
      } else {
        res.status(200).json({
          error: "your request is being studied",
        });
      }
    }
  } catch (error) {
    console.log("error :", error);
  }
};

export const getAllWorkspaceDemands = async (req: Request, res: Response) => {
  try {
    console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeee2023");
    const demands = await Demande.find({ workspace: req.params.id }).populate({
      path: "member",
      model: "WorkspaceMember",
    });
    res.status(200).json(demands);
  } catch (error) {
    console.log("error :", error);
  }
};

export const acceptOrRefuseDemande = async (req: Request, res: Response) => {
  try {
    const demande = await Demande.findOneAndUpdate(
      { _id: req.params.demande },
      { acceptanceStatus: req.body.acceptance }
    );

    if (demande) {
      const member = await WorkspaceMember.findById(demande.member);
      const workspace = await Workspace.findById(demande.workspace);

      if (workspace && member && req.body.acceptance == true) {

        if (workspace.members.indexOf(member.id) != -1) {
          console.log("dddddddddddddddddddd 88888888888c :dddddddddd")
          const result = await Demande.deleteOne({ _id: demande.id });
          console.log("result ---------- :", result)
          res.status(200).json({ error: "member already exist in this workspace" });
         
        } else {
          const result = await Demande.deleteOne({ _id: demande.id });
          console.log("demande member -----------", demande.member)
          console.log("demande member -----------", demande.workspace)
          const resultedWorkspace =await workspace.updateOne(
            { $push: { members: demande.member } },
            { new: true }
          );

          console.log("------------------------------------------------>555555555",resultedWorkspace)
          const findedMember = await WorkspaceMember.findOneAndUpdate(
            { _id: demande.member },
            { $push: { workspacesMembership: demande.workspace } },
            { new: true }
          );
           console.log("-----------------------------findedMember :", findedMember)
          const emailData = {
            subject: "Acceptation de Demande",
            content: `votre demande de joindre le workspace ${workspace.name} a été acceptée ; vous etes un membre du ${workspace.name} workspace`,
            recievers: [member.email],
          };
          const emailingResult = sendEmail(
            emailData.recievers,
            emailData.subject,
            emailData.content
          );
          res.status(200).json({ message: "member has been added successfully " });
        }
        
      } else if (workspace && member && req.body.acceptance == false) {
        const result = await Demande.deleteOne({ _id: demande.id });
        console.log("rejeccttetetetette ", result)
        const emailData = {
          subject: "Refus de Demande",
          content: `votre demande de joindre le workspace ${workspace.name} a été refusée ; essayer ulterièrement !`,
          recievers: [member.email],
        };
        const emailingResult = sendEmail(
          emailData.recievers,
          emailData.subject,
          emailData.content
        );
        res.status(200).json({ message: "demande rejected successfully" });
      }


    }
  } catch (error) {
    console.log("error :", error);
  }
};
