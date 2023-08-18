import {Request, Response} from "express"
import { Workspace } from "../../models/Workspace"

export const getWorkspaceById = async(req:Request, res:Response ) =>
{
    const workspace = await Workspace.findById({_id: req.params.id}).populate([
        {
            path:"members",
            model:"WorkspaceMember"
        },
        {
            path:"idResponsable",
            model:"WorkspaceMember"
        },
        {
          path: "taskPropositions",
          model : "TaskProposition"
        }
    ])
    res.status(200).json(workspace)
}