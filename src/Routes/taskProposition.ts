import { requestValidator, requireAuth } from "@portail_entreprise/common";
import { currentUser } from "../current-user";
import express, { Response } from "express";
import { body, check } from "express-validator";
import { acceptTaskProposition } from "../controllers/TaskProposition/acceptTaskProposition";
import {
  createTaskProposition,
  getTaskPropositions,
  getTasksToClarify,
  getTasksToValidate,
  getWorkspaceFalseClaims,
} from "../controllers/TaskProposition/createTaskProposition";
import {
  falseClaim,
  getTaskPropositionById,
  updateProposition,
} from "../controllers/TaskProposition/updateTaskPropositon";
import { demandClarificationPropositions } from "../controllers/TaskProposition/DemandClarification";
import { refuseProposition } from "../controllers/TaskProposition/refuseTaskProposition";
import { clarifyPropositions } from "../controllers/TaskProposition/clarifyTaskProposition";

const Router = express.Router();

//createTaskProposition
Router.route("/").post(
  currentUser,
  requireAuth,
  [
    body("title")
      .notEmpty()
      .withMessage("the name of the task proposition  is required !"),
    body("id_creator")
      .notEmpty()
      .withMessage("proposition creator  is required !"),
    body("id_responsable_validation")
      .notEmpty()
      .withMessage("proposition validator  is required !"),
    body("description")
      .notEmpty()
      .withMessage("the description of the task proposition is required !"),
    body("categorie")
      .notEmpty()
      .withMessage(" categorie of the task proposition is required !"),
    check("email_beneficiaires")
      .isArray()
      .withMessage("Emails must be an array")
      .custom((value) => {
        if (!value.every((email: string) => isValidEmail(email))) {
          throw new Error("Invalid email format in the array");
        }
        return true;
      })
      .withMessage(
        "the list of  email_bénéficiaires of  the task proposition is required !"
      ),
  ],
  requestValidator,
  createTaskProposition
);
Router.route("/:id").get(getTaskPropositions);
Router.route("/:id/getWorkspaceFalseClaims").get(getWorkspaceFalseClaims);
Router.route("/:workspace/getTasksToValidate/:member").get(getTasksToValidate);
Router.route("/:workspace/getTasksToClarify/:member").get(getTasksToClarify);
Router.route("/:id/update").put(updateProposition);
Router.route("/:id/falseClaim").get(currentUser, requireAuth, falseClaim);
Router.route("/DemandeClarification").put(
  currentUser,
  requireAuth,
  [
      body("propositions")
      .notEmpty()
      .withMessage("propositions to validate are required !"),
  ],
  requestValidator,
  demandClarificationPropositions);

/*
Router.route("/:id/accept").put(
  currentUser,
  requireAuth,
  [
    body("paimentStatus")
      .notEmpty()
      .withMessage("paimentStatus it should be wetheir Paid or Free  is required !"),
  ],
  requestValidator,
  acceptTaskProposition
);
*/

Router.route("/accept").put(
  currentUser,
  requireAuth,
  [
    body("paimentStatus")
      .notEmpty()
      .withMessage("paimentStatus it should be wetheir Paid or Free  is required !"),
      body("propositions")
      .notEmpty()
      .withMessage("propositions to validate are required !"),
  ],
  requestValidator,
  acceptTaskProposition
);



Router.route("/refuse").put(
  currentUser,
  requireAuth,
  [
    body("refuseReason")
      .notEmpty()
      .withMessage("the refuse Reason of the task proposition  is required !"),
      body("propositions")
      .notEmpty()
      .withMessage("propositions to validate are required !"),
  ],
  requestValidator,
  refuseProposition
);

Router.route("/:id/clarify").put(
  currentUser,
  requireAuth,
  [
    body("clarification")
      .notEmpty()
      .withMessage("clarification text is required !"),
  ],
  requestValidator,
  clarifyPropositions
);

//get Task proposition by id 
Router.route("/getById/:id").get(getTaskPropositionById);
 

    

export { Router as TaskPropositionRouter };
function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
