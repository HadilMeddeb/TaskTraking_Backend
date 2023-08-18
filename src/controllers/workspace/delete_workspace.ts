import { Request, Response } from "express";
import "express-async-errors";
import { Workspace } from "../../models/Workspace";
import { WorkspaceMember } from "../../models/WorkspaceMember";
import { TaskProposition } from "../../models/Task_proposition";
import { Task } from "../../models/Task";
import { Demande } from "../../models/Demande";
import { configData } from "../../config/ConfigData";
import axios from "axios";
const { ObjectId } = require('mongoose').Types;

interface MulterRequest extends Request {
  file: any;
}

export const deleteWorkspace = async (req: Request, res: Response) => {
  console.log(
    "delete delete deletedelete deletedeletedelete iiehjjfhdjhfjhfdjhdf",
    req.params.id
  );

  const foundedWorkspace = await Workspace.findById(req.params.id);

  if (foundedWorkspace) {
    console.log("--------------------foundedWorkspace :", foundedWorkspace);
    const existingWorkspace = await Workspace.deleteOne({
      _id: req.params.id,
    });
    console.log("---------------------existingWorkspace :", existingWorkspace);

    //*********************************************************************************** */

    if (req.body.deleteTrelloWorkspace == true) {
      console.log(
        "---------------------deleteTrelloWorkspace :",
        req.body.deleteTrelloWorkspace
      );
      const response = await axios.delete(
        `${configData.baseURL}/organizations/${foundedWorkspace.trelloWorkspace}?${configData.auth}`
      );
      console.log("----------------------- response  :", response);
    }
    //*********************************************************************************** */
    const deletedTaskPropositions = await TaskProposition.deleteMany({
      id_workspace: new ObjectId(req.body.id),
    });

   

    console.log(
      "1----------------------- deletedTaskPropositions  :",
      deletedTaskPropositions
    );
    const deletedTasks = await Task.deleteMany({
      id_workspace: new ObjectId(req.body.id),
    });

    console.log("2----------------------- deletedTasks  :", deletedTasks);

    const deletedDemandes = await Demande.deleteMany({
      workspace: new ObjectId(req.body.id),
    });
    console.log("3----------------------- deletedDemandes  :", deletedDemandes);

    await WorkspaceMember.findOneAndUpdate(
      { _id: foundedWorkspace.idResponsable },
      { $pull: { workspacesToHandle: req.params.id } },
      { new: true }
    );

    for (const member in foundedWorkspace.members) {
      const updatedMember = WorkspaceMember.findOneAndUpdate(
        { _id: member },
        {
          $pull: [
            { workspacesMembership: req.params.id },
            {
              PropositionsToClarify: {
                _id: { $in: foundedWorkspace.taskPropositions },
              },
            },
            {
              PropositionsToValidate: {
                _id: { $in: foundedWorkspace.taskPropositions },
              },
            },
          ],
        },
        { new: true }
      );
    }
  }
  res.status(200).json({ message: "workspace deleted successfully " });
  /*
    const updatedMembers = await WorkspaceMember.findOneAndUpdate(
      { _id: req.params.workspace },
      { $pull: { members: req.params.member } },
      { new: true }
    );
*/
};
