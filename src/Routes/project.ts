import { requestValidator, requireAuth } from "@portail_entreprise/common";
import { currentUser } from "../current-user";
import express, { Request } from "express";
import { addProject } from "../controllers/project/addProject";
import { getAllProjects, getAllWorkspaceProjects } from "../controllers/project/getAll";
import { deleteProject } from "../controllers/project/deleteProject";
import { body } from "express-validator";
import { updateProject } from "../controllers/project/updateProject";

//routers
const Router = express.Router();
Router.route("/addProject").post(
  [
    body("name")
      .notEmpty()
      .withMessage("the name of the project is required !"),
    body("gitLink")
    .isURL()
    .notEmpty()
    .withMessage("gitLink  is required and it should be of a URL form!"),
    
    body("demoServerURL")
    .isURL()
    .notEmpty()
    .withMessage("demoServerURL  is required and it should be of a URL form!"),
    
    body("client")
      .notEmpty()
      .withMessage("the associated client of the project is required !"),
  ],
  requestValidator,
  addProject
);
Router.route("/:id").delete(deleteProject);
Router.route("/getAll").get(getAllProjects);
Router.route("/:workspace/getAllWorkspaceProjects").get(getAllWorkspaceProjects);
Router.route("/:id/updateProject").put(
  [
    body("name")
      .notEmpty()
      .withMessage("the name of the project is required !"),
    body("client")
      .optional()
      .notEmpty()
      .withMessage("the associated client of the project is required !"),
    body("gitLink")
      .optional()
      .isURL()
      .withMessage("gitLink should be a link !"),
    body("demoServerURL")
      .optional()
      .isURL()
      .withMessage("demoServerURL should be a link !"),
  ],
  requestValidator,
  updateProject
);

export { Router as projectRouter };
