import {
  NotAuthorizedError,
  BadRequestError,
} from "@portail_entreprise/common";
import { Request, Response } from "express";
import { Workspace } from "../../models/Workspace";


interface MulterRequest extends Request {
  file: any;
}

export const updateWorkspace = async (req: Request, res: Response) => {
  if (req.currentUser) {
    try {
      const workspace = await Workspace.findById(req.params.id);
      if (workspace?.idResponsable == req.currentUser.id) {
        const workspacesSimilar = await Workspace.find({ name: req.body.name });
        
        if (workspacesSimilar.length > 1) {
          return res.status(200).json({ error: "workspace name already exist !" });
        } else {
          const result = await workspace.updateOne(req.body, { new: true });
          return res.status(200).send(result);
        }
      } else {
        throw new NotAuthorizedError();
      }
    } catch (err) {
      console.log("error :", err);
      throw new BadRequestError("something went wrong !");
    }
  } else {
    throw new NotAuthorizedError();
  }
};



export const updateWorkspacePicture = async (
  req: Request,
  res: Response,
  next: Function
) => {
  console.log("listen listen workspace image eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
  console.log("888888888888888888888888888888888888888888",(req as MulterRequest).file)
  const workspace = await Workspace.findByIdAndUpdate(
    req.params.id,
    { $set: { image: (req as MulterRequest).file.filename } },
    { new: true }
  );
  console.log("member :",workspace)
  res.status(200).json(workspace)
};