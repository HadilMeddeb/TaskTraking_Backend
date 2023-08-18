
import {requestValidator, requireAuth } from "@portail_entreprise/common";
import {currentUser} from "../current-user"
import express from "express";
import { getAllClients } from "../controllers/client/getAllClients";
import { addClient } from "../controllers/client/addClient";
import { deleteClient } from "../controllers/client/deleteClient";
import { addPhoneNumbersAndEmails, removeEmail, removePhoneNumber, updateClient } from "../controllers/client/updateClient";
import { body } from "express-validator";
import { adressValidation } from "../customValidation/address_validation";



//routers
const Router = express.Router();
Router.route("/addClient").post(
    [
    body("name")
      .notEmpty()
      .withMessage("the name of the project is required !"),
    body("emails")
    .isArray({ min: 1 })
    .withMessage("at least one email is required !"),
    body("emails.*")
      .isEmail()
      .withMessage("invalid email form !"),
    body("phones")
      .isArray({min: 1 })
      .withMessage("at least one phone number is required !"),
    body("phones.*")
      .isNumeric()
      .isLength({ min: 8, max: 8 })
      .withMessage("tel number  must be formed of 8 digits"),
    body("adress")
    .isObject()
    .custom(adressValidation)
    .withMessage("city , street and zip are required"),
  ],
  requestValidator,
  addClient);
Router.route("/:id").delete(deleteClient);
Router.route("/:id/addEmailsAndPhones").put([
    body("phones.*")
    .isNumeric()
    .isLength({ min: 8, max: 8 })
    .withMessage("tel number  must be formed of 8 digits"),
    body("emails.*")
    .isEmail()
    .withMessage("invalid email form !"),
],
requestValidator,
addPhoneNumbersAndEmails);
Router.route("/:id/removeEmail").put(
   [ body("email")
    .notEmpty()
    .withMessage("email to remove is required !"),
    body("email")
    .isEmail()
    .withMessage(" email to remove has an invalid form !"),
],
    requestValidator,
    removeEmail);
Router.route("/:id/removePhoneNumber").put(
[ 
body("phone")
.notEmpty()
.withMessage("phone to remove is required !"),
body("phone")
.isNumeric()
.isLength({ min: 8, max: 8 })
.withMessage("tel number  must be formed of 8 digits")
.withMessage("phone to remove must be a number formed of 8 digits  !")

],
requestValidator,
removePhoneNumber);
Router.route("/:id/updateClient").put([
    body("adress")
    .optional()
    .isObject()
    .custom(adressValidation)
    .withMessage("city , street and zip are required"),
],requestValidator,updateClient);
Router.route("/getAll").get(getAllClients);

 


export { Router as clientRouter };


