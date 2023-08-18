
import { WorkspaceMember } from "../../models/WorkspaceMember";
import { Request, Response } from "express";

//controllers
export const getMemberById = async (
  req: Request,
  res: Response
) => {
  const member = await WorkspaceMember.findById(req.params.id);
  res.status(200).json(member);
};

