import { requestValidator, requireAuth } from "@portail_entreprise/common";
//const multer = require('multer')
//const sharp = require('sharp')
import { currentUser } from "../current-user";
import express, {Request, Response } from "express";
import { body, check } from "express-validator";
import {
  addCompetence,
  removeCompetence,
} from "../controllers/profile/competence";
import {
  addExperience,
  removeExperience,
} from "../controllers/profile/experience";
import { addDiplome, removeDiplome } from "../controllers/profile/diplome";
import {
  updateWorkspaceMemberController,
} from "../controllers/profile/update_profile";
import { adressValidation } from "../customValidation/address_validation";
import { checkBirth } from "../customValidation/birthdate_validation";
import { posteValidation } from "../customValidation/poste_validation";
import { storage } from "../middlewares/storage";
import { upload } from "../middlewares/upload";
import {updateProfilePicture} from "../controllers/profile/update_profile"
import { getMemberById } from "../controllers/profile/getMemberById";

const Router = express.Router();

//competences routers
//add
Router.route("/:id/competences").put(
  currentUser,
  requireAuth,
  [
    body("newCompetences.*")
      .notEmpty()
      .withMessage("the name of the new Competence to add is required"),
  ],
  requestValidator,
  addCompetence
);

//remove competence
Router.route("/:id/competences/remove").put(
  [
    body("competence")
      .notEmpty()
      .withMessage("the name of the competence to remove is required "),
  ],
  requestValidator,
  removeCompetence
);

//diplome routers
Router.route("/:id/diplomes").put(
  [
    check("titre").notEmpty().withMessage("diplome title is required"),
    check("date_obtention").notEmpty().withMessage("diplome date is required"),
    check("faculte").notEmpty().withMessage("faculté  is required"),
  ],
  requestValidator,
  addDiplome
);

//remove diplome
Router.route("/:id/diplomes/remove").put(
  [
    body("diplome")
      .notEmpty()
      .withMessage("diplome id  to remove  is required"),
  ],
  requestValidator,
  removeDiplome
);

//experience routers
Router.route("/:id/experiences").put(
  [
    check("titre").notEmpty().withMessage("experience title is required"),
    check("societe").notEmpty().withMessage(" society name is required"),
    check("description").notEmpty().withMessage("description is required"),
    check("start_Date")
      .notEmpty()
      .withMessage("experience start_Date is required")
      .isDate()
      .withMessage("invalid value start Date should be  a date "),
    check("end_Date")
      .notEmpty()
      .withMessage("experience end_Date is required")
      .isDate()
      .withMessage("invalid value end Date should be  a date "),
  ],
  requestValidator,
  addExperience
);

//remove experience
Router.route("/:id/experiences/remove").put(
  currentUser,
  requireAuth,
  [
    body("experience")
      .notEmpty()
      .withMessage("experience id  to remove  is required"),
  ],
  requestValidator,
  removeExperience
);

//general update router
Router.route("/:id").put(
  currentUser,
  requireAuth,
  [
    body("fullname")
      .optional()
      .matches(/^[a-zA-Z]+\s[a-zA-Z]+$/)
      .withMessage("fullname should be formed of two words"),
    body("tel")
      .optional()
      .isNumeric()
      .isLength({ min: 8, max: 8 })
      .withMessage("tel number  must be formed of 8 digits"),
    body("adress")
      .optional()
      .isObject()
      .custom(adressValidation)
      .withMessage("city , street and zip are required"),
    body("posteActuelle")
      .optional()
      .isObject()
      .custom(posteValidation)
      .withMessage("departement  and post title are required"),
    body("linkedin")
      .optional()
      .isURL({
        protocols: ["http", "https"],
        require_protocol: true,
      })
      .withMessage("a linkedin URL link is required "),
    body("facebook")
      .optional()
      .isURL({
        protocols: ["http", "https"],
        require_protocol: true,
      })
      .withMessage("a facebook URL link is required "),
    body("instagrame")
      .optional()
      .isURL({
        protocols: ["http", "https"],
        require_protocol: true,
      })
      .withMessage("a instagram URL link is required "),
    body("birth_date")
      .optional()
      .isDate()
      .custom(checkBirth)
      .withMessage("invalid birth date"),
  ],
  requestValidator,
  updateWorkspaceMemberController
);

//update avatar
Router.route("/:id/avatar").put(storage,(req: Request,res:Response) => {
  console.log("req.body 9999 :", (req as any).files)
  console.log("req.body 2 :", req.body);
   res.status(200).json({message :req.params.id})
  });

/*
const upload = multer({
  limits: {
      fileSize: 1000000
  },
  fileFilter(req:Request, file:any, cb:any) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(new Error('Please upload a valid image file'))
      }
      cb(undefined, true)
  }
})

Router.post('/image', upload.single('upload'), async (req, res) => {
  try {
       await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toFile(__dirname + `/images/${req.file.originalname}`)
       res.status(201).send('Image uploaded succesfully')
  } catch (error) {
      console.log(error)
      res.status(400).send(error)
  }
})

*/
//update avatar picture
Router.put("/updateProfilePicture/:id",upload.single('image'),
updateProfilePicture)

//get member By id
Router.get("/:id",getMemberById)

export { Router as profileRouter };
