
import {requireAuth } from "@portail_entreprise/common";
import {currentUser} from "../current-user"
import express from "express";
import { addFacture } from "../controllers/facture/addFacture";
import { getTaskById, getTaskByTaskProp } from "../controllers/Task/getTaskById";
import { getFactureById } from "../controllers/facture/getFactureById";
import { AddCheckList, AddTaskWithFiles, AddUnderTask, createTask, integrateInTrello } from "../controllers/Task/createTask";
import { AddCollaboratorToTask, getCollaboratorsNotInTask } from "../controllers/Task/getCollaboratorsNotInTask";
import { exportTaskDataToExcel, importExcelAndInsertData } from "../controllers/Excel/exportData";
import { upload } from "../middlewares/upload";
import { uploadFiles } from "../controllers/Task/uploadFile";



//routers
const Router = express.Router();
Router.route("/addFacture").post(currentUser,requireAuth,addFacture);
Router.route("/:id").get(getTaskById);
Router.route("/taskProp/:id").get(getTaskByTaskProp);
Router.route("/factureById/:id").get(getFactureById);
Router.route("/").post(createTask);
Router.route("/:id/getCollaboratorsNotInTask").get(getCollaboratorsNotInTask);
Router.route("/:id/integrateInTrello").put(integrateInTrello);
Router.route("/:id/AddCheckList").post(AddCheckList);
Router.route("/checklist/:id/AddUnderTask").post(AddUnderTask);
Router.route("/:id/AddCollaboratorToTask").put(AddCollaboratorToTask);
Router.route("/:workspace/exportTaskDataToExcel").get(exportTaskDataToExcel);
Router.route("/:workspace/importExcelAndInsertData").get(importExcelAndInsertData);
Router.route("/AddTaskWithFiles").post(upload.array('files[]'),AddTaskWithFiles)


export { Router as taskRouter };


