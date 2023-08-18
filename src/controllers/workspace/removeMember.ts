import { Request, Response } from "express";
import "express-async-errors";
import { Workspace } from "../../models/Workspace";
import { WorkspaceMember } from "../../models/WorkspaceMember";

export const RemoveMember = async (req: Request, res: Response) => {
    console.log("rrrrrrrrrrrr777777777778888888888899999999999999++++++++++++++")
  const workspace = await Workspace.findOneAndUpdate(
    {_id:req.params.workspace},
    { $pull: { members:req.params.member } },
    { new: true }
  );

  await WorkspaceMember.findOneAndUpdate(
    {_id:req.params.member},
    { $pull: { workspacesMembership: req.params.workspace } },
    { new: true }
  );

  res.status(200).json(workspace);
};
