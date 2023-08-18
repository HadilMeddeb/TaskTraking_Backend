import { requestValidator, requireAuth } from "@portail_entreprise/common";
import { currentUser } from "../current-user";
import express from "express";
import { deleteCategory } from "../controllers/taskCategory/deleteCategory";
import { getAllCategories } from "../controllers/taskCategory/getAllCategories";
import { addCategory } from "../controllers/taskCategory/addCategory";
import { body } from "express-validator";

//routers
const Router = express.Router();
Router.route("/addCategory").post(
  [body("designation").notEmpty().withMessage(" category name is required")],
  requestValidator,
  addCategory
);
Router.route("/:id").delete(
  deleteCategory
);
Router.route("/getAll").get(getAllCategories);

export { Router as categoryRouter };
