
import {requestValidator, requireAuth } from "@portail_entreprise/common";
import {currentUser} from "../current-user"
import express from "express";
import { addList } from "../controllers/BoardTrellolist/addList";
import { deleteList } from "../controllers/BoardTrellolist/deleteList";
import { getAlllists } from "../controllers/BoardTrellolist/getAllLists";
import { body } from "express-validator";



//routers
const Router = express.Router();
Router.route("/addlist").post(
    [
    body("listName")
    .notEmpty()
    .withMessage(" list Name  is required")],
    requestValidator,
    addList);
Router.route("/:id").delete(
    deleteList);
Router.route("/getAll").get(getAlllists);

 


export { Router as listRouter };


