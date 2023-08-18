import {requestValidator, requireAuth } from "@portail_entreprise/common";
import {currentUser} from "../current-user"
import express from "express";
import { body } from "express-validator";
import { currentuserController } from "../controllers/auth/currentUser";
import { signInController } from "../controllers/auth/signIn";
import { signOutController } from "../controllers/auth/signOut";
import {  signUpController } from "../controllers/auth/signUp";
import { sendEmail, sendEmailController } from "../middlewares/sendEmail";

//routers
const Router = express.Router();
Router.route("/currentUser").get(currentUser,requireAuth,currentuserController);
Router.route("/signOut").get(currentUser,signOutController);
Router.route("/signIn").post( [
    body("password").notEmpty().withMessage("password is required"),
    body("email").isEmail().withMessage("Email must be valid").notEmpty().withMessage("Email is required"),
  ],
  requestValidator,
  signInController);
Router.route("/signUp").post( [

    body("email").isEmail().withMessage("Email must be valid").notEmpty().withMessage( "email is required" ),
    body("password").trim().isLength({ min: 8, max: 20 }).withMessage("Password must be between 8 and 20 characters")
      .matches(/\d+/).withMessage("Password must contain at least one digit")
      .matches(/[A-Z]+/).withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]+/).withMessage("Password must contain at least one lowercase letter")
      .matches(/[?!$@%#&_£§]+/).withMessage("Password must contain at least one special caracter from theese {?!$@%#&_£§}"),
    body("role").notEmpty().withMessage("role is required" )
      .isIn(["gestionnaire", "collaborateur"]).withMessage("either 'gestionnaire' or 'collaborateur' choose only one option of theese "),
    body("username").notEmpty().withMessage("username is required" )
      .isLength({ min: 3, max: 10 }).withMessage("username must be between 3 and 10 characters")
  ],
  requestValidator,
  signUpController);

Router.route("/sendEmail").get(
  sendEmailController
)

export { Router as authRouter };
