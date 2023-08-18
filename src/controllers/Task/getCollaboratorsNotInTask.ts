import {BadRequestError} from "@portail_entreprise/common";
  import { Request, Response } from "express";
  import { Task } from "../../models/Task";
import { Workspace } from "../../models/Workspace";



 /******************************* get All get Collaborators Not In Task *********************************/

  export const getCollaboratorsNotInTask = async (req: Request, res: Response) => {
    console.log("------------------req.params.id :", req.params.id)  
    try {
          const task= await Task.findById(req.params.id)
          console.log("-------------******> task ",task)
          if (task)
          {
             const workspace = await Workspace.findOne({_id:task.id_workspace}).populate(
              { path: "members", model: "WorkspaceMember" })
            console.log("-----------------> workspace :",workspace )
             if(workspace)
             {
              const members = workspace.members.filter((member)=>{ 
               return  task.collaborators.indexOf(member) == -1 })  

              console.log("1--------------> members :", members)
          res.status(200).json(members)
             }

    }} catch (err) {
      console.log("error :", err);
      throw new BadRequestError("something went wrong !");
    }

  };
  


/******************************* Add collaborator To Task  ***********************/

export const AddCollaboratorToTask = async (req: Request, res: Response) => {
  console.log("---------------> req.body :",req.body)
  const resultedtask= await Task.findById(req.params.id);
  console.log("resultedtask :", resultedtask)
  if(resultedtask && (resultedtask.collaborators.indexOf(req.body.collaborator) == -1))
  {
    console.log("8888888888888888888888888888888888888888888888")
    console.log("req.body.collaborator :",req.body.collaborator)
    const task = await resultedtask.updateOne (
      { $push: { collaborators: req.body.collaborator } },
      { new: true }
    );
    console.log("here is the task  trarampam :", task)
    return res.status(200).json(task);
  }
  else
  {
    console.log("pararam pam")
    return res.status(200).json({error:"collaborator already added on Task"});
  }

  
};
