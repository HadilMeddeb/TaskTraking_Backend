import { NotAuthorizedError, NotFoundError } from "@portail_entreprise/common";
import { WorkspaceMember } from "../../models/WorkspaceMember";
import { Request, Response } from "express";

//add experience
export const addExperience = async (req: Request, res: Response) => {
  const workspaceMember = await WorkspaceMember.findById(req.params.id);
  console.log("111111111111111111111111111111111111111111111111111111111")
  if (!workspaceMember) {
    throw new NotFoundError("workspaceMember");
  }

 /* if (workspaceMember.user_id !== req.currentUser?.id) {
    throw new NotAuthorizedError();
  }*/

  try {
    const updatedWorkspaceMember= await WorkspaceMember.findOneAndUpdate(
      { _id: workspaceMember.id },
      { $push: { experiences: req.body }},
      {new:true}
    );
    console.log("--------updatedWorkspaceMember :",updatedWorkspaceMember)
    await workspaceMember.save();
    res.send(updatedWorkspaceMember);
  } catch (err) {
    console.log(err);
  } 
};

//remove experience
export const removeExperience = async (req: Request, res: Response) => {
  console.log("experience *******************id :",req.params.id)
  const workspaceMember = await WorkspaceMember.findOne({_id:req.params.id});
  
  console.log("******************* workspaceMember",workspaceMember)
  
  if (!workspaceMember) {
    throw new NotFoundError("workspaceMember");
  }

 /* if (workspaceMember.user_id !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
*/
   const index = await workspaceMember.experiences.findIndex(
    (experience) => experience._id.toString() === req.body.experience
  );
  console.log("index :", index)

  console.log("test0")

  if (index === -1) {
    console.log("test1")
    throw new NotFoundError("experience");
  }

  try {
    
     const updatedWorkspaceMember=await WorkspaceMember.findOneAndUpdate(
     {_id: workspaceMember._id},
      { $pull: { experiences: { _id: req.body } } },
      { new: true }
    );
    console.log("test3")
    console.log("-------------------updated workspaceMember : ----------------", updatedWorkspaceMember)
    res.status(200).json(updatedWorkspaceMember);
    await workspaceMember.save();
  } catch (err) {
    console.log(err);
    throw new Error();
  }

  
};
