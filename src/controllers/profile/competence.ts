import { NotAuthorizedError, NotFoundError } from "@portail_entreprise/common";
import { WorkspaceMember } from "../../models/WorkspaceMember";
import { Request, Response } from "express";

//add Competence
export const addCompetence = async (req: Request, res: Response) => {
  const workspaceMember = await WorkspaceMember.findById(req.params.id);
  if (!workspaceMember) {
    throw new NotFoundError("workspaceMember");
  }
  try {
    const updatedWorkspaceMember = await WorkspaceMember.findByIdAndUpdate(
      { _id: workspaceMember._id },
      { $push: { competences: req.body.competence }},
      { new: true }
    );
    res.status(200).json(updatedWorkspaceMember);
  } catch (err) {
    console.log(err);
  }
};




//remove competence
export const removeCompetence = async (req: Request, res: Response) => {
  const workspaceMember = await WorkspaceMember.findById(req.params.id);
  if (!workspaceMember) {
    throw new NotFoundError("workspaceMember");
  }
  const competenceToRemove = req.body.competence.trim().toLowerCase();
  const index = await workspaceMember.competences.findIndex(
    (competence) => competence.toLowerCase() === competenceToRemove
  );
console.log("competenceToRemove :",competenceToRemove)
  if (index !== -1) {
    workspaceMember.competences.splice(index, 1);
  } else {
    throw new NotFoundError("competence");
  }
  try {
    await WorkspaceMember.findOneAndUpdate(
      { _id: workspaceMember.id },
      { $set: { competences: workspaceMember.competences } }
    );
  } catch (err) {
    console.log(err);
    throw new Error();
  }
  res.send(workspaceMember);
};
