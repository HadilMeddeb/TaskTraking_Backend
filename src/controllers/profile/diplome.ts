import { NotAuthorizedError, NotFoundError } from "@portail_entreprise/common";
import { WorkspaceMember } from "../../models/WorkspaceMember";
import { Request, Response } from "express";

//add diplome
export const addDiplome = async (req: Request, res: Response) => {
  const workspaceMember = await WorkspaceMember.findById(req.params.id);
  if (!workspaceMember) {
    throw new NotFoundError("workspaceMember");
  }
  
  /*if (workspaceMember.user_id !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }*/
  try {
    const updatedWorkspaceMember= await WorkspaceMember.findOneAndUpdate(
      { _id: workspaceMember.id },
      { $push: { diplomes: req.body } },
      {new:true}
    );

    await workspaceMember.save();
    res.send(updatedWorkspaceMember);
  } catch (err) {
    console.log(err);
  }
};


//remove diplome
export const removeDiplome = async (req: Request, res: Response) => {
  const workspaceMember = await WorkspaceMember.findById(req.params.id);

  if (!workspaceMember) {
    throw new NotFoundError("workspaceMember");
  }

  if (workspaceMember.id !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }

   const index = await workspaceMember.diplomes.findIndex(
    (diplome) => diplome._id.toString() === req.body.diplome
  );
  console.log("index :", index)

  if (index === -1) {
    throw new NotFoundError("diplome");
  }

  try {
     const updatedWorkspaceMember=await WorkspaceMember.findByIdAndUpdate(
      workspaceMember._id,
      { $pull: { diplomes: { _id: req.body.diplome } } },
      { new: true }
    );
    await workspaceMember.save();
    res.send(updatedWorkspaceMember);
  } catch (err) {
    console.log(err);
    throw new Error();
  }

  
};
