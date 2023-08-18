import {
  requestValidator,
  requireAuth,
  //currentUser
} from "@portail_entreprise/common";
import express, { NextFunction,Response, Request } from "express";
import {currentUser} from "../current-user"
import { body,check } from "express-validator";
import {
  createBoard,
  createCard,
  createList,
  createOrganization,
  deleteModelWebhooks,
  getBoardById,
  getBoardCards,
  getBoardLists,
  getCardById,
  getListCards,
  getNotifiedFromWebhook,
  getTrelloBoards,
  getWebhooks,
  updateCard,
  WebhookOnCard,
  WebhookOnWorksapce,
} from "../controllers/Task/Trello_addTask";
import { AddMember } from "../controllers/workspace/add_members";
import { createWorkspace } from "../controllers/workspace/create_workspace";
import { setcurrentWorkspaceMember } from "../middlewares/setcurrent-WorkspaceMember";
import {
   getCurrentMember,
} from "../controllers/workspace/getCurrentMember";
import { requireMemberWorkspace } from "../middlewares/require_workspaceMember";
import {getAllWorkspaces, getCurrentResponsibleWorkspaces, getCurrentUserWorkspaces} from "../controllers/workspace/getCurrentUserWorkspaces"
import { getAllMembersInWorkspace, getAllMembersNotInWorkspace } from "../controllers/workspace/getAllMembers";
import { GetStatisticsOfTaskProposition } from "../controllers/TaskProposition/GetStatistics";
import { getWorkspaceTasks } from "../controllers/Task/getWorkspaceTasks";
import { acceptOrRefuseDemande, envoieDemandeJoindre, getAllWorkspaceDemands } from "../controllers/workspace/envoieDemande";
import { RemoveMember } from "../controllers/workspace/removeMember";
import { updateWorkspace, updateWorkspacePicture } from "../controllers/workspace/update_workspace";
import { getWorkspaceById } from "../controllers/workspace/getWorkspaceById";
import { upload } from "../middlewares/upload";
import { deleteWorkspace } from "../controllers/workspace/delete_workspace";
import { getAllTrelloWorkspaces } from "../controllers/workspace/getAllTrelloWorkspaces";
const Router = express.Router();

//createWorkspace
Router.route("/").post(
  currentUser,
  requireAuth,
  requireAuth,
  [
    body("icon")
      .notEmpty()
      .withMessage("workspace icon is required"),
    body("name")
      .notEmpty()
      .withMessage("workspace name is required"),
    body("detailsAbout")
      .notEmpty()
      .withMessage("workspace details are required"),
  ],
  requestValidator,
  createWorkspace
);



//delete workspace
Router.route("/:id/deleteTrelloWorkspace").put(
  currentUser,
  requireAuth,
  [
    body("deleteTrelloWorkspace")
      .notEmpty()
      .withMessage("deleteTrelloWorkspace option is required")
  ],
  requestValidator,
  deleteWorkspace
);




Router.route("/:id").put(
  currentUser,
  requireAuth,
  updateWorkspace
);


Router.route("/:id/updateWorkspacePicture").put(
  currentUser,
  requireAuth,
  upload.single('image'),
  updateWorkspacePicture
);


Router.route("/getById/:id").get(
  currentUser,
  requireAuth,
  getWorkspaceById
);


//add member
Router.route("/:id/addMembers").put(
  [
    body("members")
    .notEmpty()
    .withMessage("A list of members is required")
    .isArray({ min: 1 })
    .withMessage("Members list must contain at least one member"),
   /*  check("members.*.email")   
    .notEmpty()
    .withMessage("email of each member is required")*/
  ],
  requestValidator,
  AddMember
);

//get Workspace Statistics
Router.route("/:id/statistics").get(
  currentUser,
  requireAuth,
  GetStatisticsOfTaskProposition
);





//setCurrent workspace and current Memebr
Router.route("/currentWorkspace_currentMember").post(
  currentUser,
  requireAuth,
  [
    body("currentWorkspace")
      .notEmpty()
      .withMessage("the name of the workspace is required "),
    body("currentMember")
      .notEmpty()
      .withMessage("currentMember is required"),
  ],
  requestValidator,
  setcurrentWorkspaceMember
);

//get currentUser workspaces 
Router.route("/getCurrentUserWorkspaces").get(
  currentUser,
  requireAuth,
 getCurrentUserWorkspaces
);

Router.route("/:id/getAllMembersNotInWorkspace").get(
  getAllMembersNotInWorkspace
);

Router.route("/currentMember").get(currentUser, requireAuth, getCurrentMember);
//getAllBoards
Router.route("/boards").get(getTrelloBoards);
//getBoardById
Router.route("/boards/:id").get(getBoardById);
//createBoard
Router.route("/boards").post(createBoard);
//getBoardCards
Router.route("/boards/:id/cards").get(getBoardCards);
//getListCards
Router.route("/lists/:list/cards").get(getListCards);
//getCardById
Router.route("/cards/:card").get(getCardById);
//updateCard
Router.route("/cards/:card").put(updateCard);
//getBoardLists
Router.route("/boards/:id/lists").get(getBoardLists);
//createList
Router.route("/boards/cards/:list").post(createList);
//createCard
Router.route("/boards/cards").post(createCard);
/// create Webhook On Card To Get Notified Whenever Task Has Terminated
Router.route("/webhooks").post(WebhookOnCard);
/// get webhooks 
Router.route("/webhooks").get(getWebhooks);
/// get webhooks  on this url
Router.route("/webhooks/reponse").post(getNotifiedFromWebhook)
//webhook on workspace 
//get webhooks of the model
Router.route("/webhooks/:idModel").delete(deleteModelWebhooks)
//create organization
Router.route("/organisations").post(createOrganization)
//get workspace Tasks 
Router.route("/:id/tasks").get(getWorkspaceTasks)
//getALLWorkspaces
Router.route("/").get(getAllWorkspaces)
// ------------------------Demands --------------------//


//envoie demande
Router.route("/:workspace/demande/:member").post(envoieDemandeJoindre)

//get ALL Workspace demands
Router.route("/:id/getAllWorkspaceDemands").get(getAllWorkspaceDemands)


//get ALL Workspace demands
Router.route("/:demande/acceptOrRefuseDemande").put(acceptOrRefuseDemande)

//get workspace members 

Router.route("/:workspace/getMembers").get(getAllMembersInWorkspace)

Router.route("/:workspace/removeMember/:member").delete(RemoveMember)


//getCurrentResponsibleWorkspaces
Router.route("/getCurrentResponsibleWorkspaces/:id").get(currentUser,
  requireAuth,
  getCurrentResponsibleWorkspaces)

  Router.route("/getAllTrelloWorkspaces").get(
    getAllTrelloWorkspaces)
  
  
export { Router as workspaceRouter };
