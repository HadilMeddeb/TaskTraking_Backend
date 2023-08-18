
import express from "express";
import { getTrelloBoardLists } from "../controllers/Board/getAllBoardLists";
import { getTrelloWorkspaceBoards } from "../controllers/Board/getAllTrelloWorkspaceBoards";


//routers
const Router = express.Router();
Router.route("/workspace/:id/getAllBoards").get(getTrelloWorkspaceBoards);
Router.route("/:id/getAllLists").get(getTrelloBoardLists);



export { Router as boardRouter };


