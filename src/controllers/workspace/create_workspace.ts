import axios from "axios";
import { configData } from "../../config/ConfigData";
import { Request, Response } from "express";
import {
  BadRequestError,
  NotAuthorizedError,
} from "@portail_entreprise/common";
import "express-async-errors";
import { Workspace } from "../../models/Workspace";
import { WorkspaceMember } from "../../models/WorkspaceMember";
import { AssociationCollaboratorMember } from "../../models/AssociationCollaboratorMember";
import { sendEmail } from "../../middlewares/sendEmail";
import { Board } from "../../models/TrelloBoard";
import { IList } from "../../extra/listWithOrderForBoard";
import { List } from "../../models/BoardTrelloList";

export const createWorkspace = async (req: Request, res: Response) => {
  if (req.currentUser) {

    if (!req.body.createTrello) {
      /*-------- case 1 : ***********************************case we will not crate trello workspace***************************** */
      const existingWorkspace = await Workspace.findOne({
        $or: [
          { name: req.body.name },
          { trelloWorkspace: req.body.trelloWorkspace },
        ],
      });

      if (existingWorkspace) {
        throw new BadRequestError("workspace  already exist");
      }

      const workspace = await Workspace.build({
        idResponsable: req.currentUser.id,
        name: req.body.name,
        detailsAbout: req.body.detailsAbout,
        icon: req.body.icon,
        trelloWorkspace: req.body.trelloWorkspace,
      }).save();

      /**************************Add initial board if there is no boards*****************/
      const result = await axios.get(
        `${configData.baseURL}/organizations/${req.body.trelloWorkspace}/boards?${configData.auth}`
      );

      if (result.data.length == 0) {
        const board = await axios.post(
          `${configData.baseURL}boards?name=initialBoard&${configData.auth}`,
          { idOrganization: req.body.trelloWorkspace }
        );
      }
      /**************************Add workspace responsable *****************/

      AddResponsableId(workspace, req.currentUser.id);

      /**************************Add Trello members into the workspace *****************/

      const response = await axios.get(
        `${configData.baseURL}/organizations/${req.body.trelloWorkspace}/members?${configData.auth}`
      );

      response.data.forEach((collaborateur: any) => {
        addTrelloCollaboratorAsPlateformMember( workspace, collaborateur.id, workspace.idResponsable);
      });

      res.status(200).json(workspace);
    } else {
      /*-------- case 2 : ***********************************case we will  create  a trello workspace***************************** */

      const existingWorkspace = await Workspace.findOne({
        name: req.body.name,
      });

      if (existingWorkspace) {
        throw new BadRequestError("workspace name already exist");
      }

      const organization = await axios.post(
        `${
          configData.baseURL
        }organizations?displayName=${req.body.name.trim()}&${configData.auth}`
      );
      console.log("-------------------------> 1  create organization :", organization.data );
      const workspace = await Workspace.build({
        name: req.body.name.trim(),
        detailsAbout: req.body.detailsAbout,
        icon: req.body.icon,
        idResponsable: req.currentUser.id,
        trelloWorkspace: organization.data.id,
      }).save();
      console.log( "-------------------------> 2  create my workspace :", workspace );
      AddResponsableId(workspace, req.currentUser.id);
      console.log("------------------- 1 : created workspace :", workspace);
      const trelloboard = await axios.post(
        `${configData.baseURL}boards?name=${req.body.initialBoardName}&${configData.auth}`,
        { idOrganization: organization.data.id }
      );
      console.log( "------------------- 2 : created trello board :", trelloboard.data );
      const boardLists = trierLists(req.body.boardLists);
      console.log("------------------- 3 : boardLists :", boardLists);

      const board = await Board.build({
        id_workspace: workspace.id,
        id_TrelloWorkspace: organization.data.id,
        id_TrelloBoard: trelloboard.data.id,
        lists: boardLists,
      }).save();

      console.log("------------------- 3 : created board  :", board);
      //create associated list if board has been created
      console.log("------------------ 4:boardLists  ", boardLists);

      boardLists.forEach(async (list: IList) => {
        const foundedList = await List.findById(list.list);
        console.log(
          "-------------------------------> : foundedList :",
          foundedList
        );
        if (foundedList) {
          const result = await axios.post(
            `${configData.baseURL}boards/${trelloboard.data.id}/lists?name=${foundedList.listName}&${configData.auth}`
          );
        }
      });
      res.status(200).json(workspace);
    }
  }
};



const addTrelloCollaboratorAsPlateformMember = async (
  workspace: any,
  trelloCollaborator: string,
  responsable: string
) => {
  const association = await AssociationCollaboratorMember.findOne({
    trelloCollaborator: trelloCollaborator,
  });
  if (!association) {
    const response = await axios.get(
      `${configData.baseURL}/members/${trelloCollaborator}?${configData.auth}`
    );

    console.log("-------------- trello member --------------> ", response.data);
    const member = await WorkspaceMember.findOne({
      email: response.data.email,
    });
    if (!member) {
      const password = generatePassword(12);
      //create member
      const workspaceMember = await WorkspaceMember.build({
        email: response.data.email,
        password: password,
        role: "collaborateur",
        username: response.data.username,
      }).save();
      //send him data
      const emailData = {
        subject: "password infos",
        content: `<p>here is your password to join ${workspace.name}
         <h3>you can youse these infos to get connected :</h3> 
         </p> 
         <h4>email : ${workspaceMember.email}</h4>
         <h4>password: ${password} </h4>`,
        recievers: [workspaceMember.email],
      };
      await sendEmail(
        emailData.recievers,
        emailData.subject,
        emailData.content
      );
      //create association
      const association = await AssociationCollaboratorMember.build({
        trelloCollaborator,
        idWorkspaceMember: workspaceMember.id,
      }).save();
      // add member to workspace and add workspace to the member
      AddMemberToWorkspace(workspace, workspaceMember.id);
    } else {
      // add member to workspace and add workspace to the member
      if (member.id != responsable) {
        AddMemberToWorkspace(workspace, member.id);
        //create association
        const association = await AssociationCollaboratorMember.build({
          trelloCollaborator,
          idWorkspaceMember: member.id,
        }).save();
        // console.log("assocaiation ------------------->", association)
      }
    }
  } else {
    AddMemberToWorkspace(workspace, association.idWorkspaceMember);
  }
};

function generatePassword(length: number): string {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";
  let password = "";
  const charsetLength = charset.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charsetLength);
    password += charset[randomIndex];
  }
  return password;
}

const AddMemberToWorkspace = async (workspace: any, member: string) => {
 
  const findedMember = await WorkspaceMember.findById(member);
  if (findedMember)
  {
    if ( findedMember.workspacesMembership.indexOf(workspace.id) == -1) {
      const workspaceMmeber = await WorkspaceMember.findOneAndUpdate(
        { _id: member },
        { $push: { workspacesMembership: workspace } },
        { new: true }
      );
    
    }
  }

  if ( workspace.members.indexOf(member) == -1) {
    
   await Workspace.findOneAndUpdate(
      { _id: workspace.id},
      { $push: { members: member } },
      { new: true }
    );
    console.log("----------2002-------> workspace :", workspace);
  
  }

};

const AddResponsableId = async (workspace: any, idResponsable: string) => {
  const member = await WorkspaceMember.findById({ _id: idResponsable });
  const updatedmember = await WorkspaceMember.findOneAndUpdate(
    { _id: idResponsable },
    {
      $push: {
        workspacesToHandle: workspace.id,
      },
    },
    { new: true }
  );
  console.log("**15*****", updatedmember);
  AddMemberToWorkspace(workspace, idResponsable);
};

const trierLists = (lists: IList[]) => {
  console.log("-----------------------> nnn ", lists);
  const sortByMapped = (map: any, compareFn: any) => (a: any, b: any) =>
    compareFn(map(a), map(b));
  const byValue = (a: any, b: any) => a - b;
  const toOrder = (e: any) => e.listOrder;
  const byOrder = sortByMapped(toOrder, byValue);
  return [...lists].sort(byOrder);
};
