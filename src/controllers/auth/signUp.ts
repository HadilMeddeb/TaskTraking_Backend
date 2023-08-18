import { Request, Response } from "express";
import { BadRequestError } from "@portail_entreprise/common";
import jwt from "jsonwebtoken";
import "express-async-errors";
import {WorkspaceMember} from "../../models/WorkspaceMember"
//controllers
export const signUpController = async (req: Request, res: Response) => {
  const { email, password, role ,username} = req.body;
  const existingWorkspaceMember = await WorkspaceMember.findOne({ email });
  if (existingWorkspaceMember) {
    throw new BadRequestError(" Email already in use ");
  }
  const existWorkspaceMember = await WorkspaceMember.findOne({ username });
  if (existWorkspaceMember) {
    throw new BadRequestError(" username already in use ");
  }

  const workspaceMember = await WorkspaceMember.build({ email, password, role,username}).save();

  //Generate JWT
  const JWT_KEY = "abgdhurmd";
  const userJwt = jwt.sign(
    {
      id: workspaceMember._id,
      email: workspaceMember.email,
      role: workspaceMember.role,
      username: workspaceMember.username,
      status: workspaceMember.status,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    JWT_KEY
  );
  //store jwt in a session
  req.session = {
    jwt: userJwt,
  };
  res.status(200).json(workspaceMember);
}


 export  const  getAllworkspaceMembers= async (req:Request, res:Response)=>{
  try {
    const workspaceMembers = await WorkspaceMember.find(); 
    console.log(workspaceMembers)
    res.status(200).json(workspaceMembers); 
  } catch (error) {
    console.error("get all workspaceMembers error :",error)
   throw new BadRequestError('Error retrieving workspaceMembers'); // Sending an error response
  }
}
