import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError } from "@portail_entreprise/common";
import { WorkspaceMember } from "../../models/WorkspaceMember";
import { Password } from "../../services/password";
import "express-async-errors";
const router = express.Router();

//controllers
export const signInController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("{ email, password }  :", { email, password } )
  const currentworkspaceMember = await WorkspaceMember.findOne({ email }).populate([
    {
      path: "workspacesMembership",
      populate: {
        path: "taskPropositions",
        populate: [
          {
            path: "id_creator",
            model: "WorkspaceMember",
          },
          {
            path: "id_responsable_validation",
            model: "WorkspaceMember",
          },
        ],
        model: "TaskProposition",
      },
    },
    {
      path: "PropositionsToValidate",
      populate: [
        {
          path: "id_creator",
          model: "WorkspaceMember",
        },
        {
          path: "id_responsable_validation",
          model: "WorkspaceMember",
        },
      ],
    },
    {
      path: "PropositionsToClarify",
      populate: [
        {
          path: "id_creator",
          model: "WorkspaceMember",
        },
        {
          path: "id_responsable_validation",
          model: "WorkspaceMember",
        },
      ],
    },
  ]);

  if (!currentworkspaceMember) {
    throw new BadRequestError("email Bad credentials");
  }
  const matched = await Password.ToCompare(currentworkspaceMember.password, password);
  if (!matched) {
    throw new BadRequestError("password Bad credentials");
  }
  console.log("currentworkspaceMember._id :",currentworkspaceMember._id)
  //Generate JWT
  const JWT_KEY = "abgdhurmd";
  const userJwt = jwt.sign(
    {
      id: currentworkspaceMember._id,
      email: currentworkspaceMember.email,
      role: currentworkspaceMember.role,
      username: currentworkspaceMember.username,
      status: currentworkspaceMember.status,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    JWT_KEY
  );

  //store jwt in a cookie whose name is session
  req.session = {
    jwt: userJwt,
  };
    console.log("returned result ", currentworkspaceMember);
    res
      .status(200)
      .json({ currentworkspaceMember, userJwt,expiresIn: 1 });
};
