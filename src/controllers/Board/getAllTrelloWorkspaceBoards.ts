import axios from "axios";
import { Response, Request } from "express";
import { configData } from "../../config/ConfigData";
import { Workspace } from "../../models/Workspace";


// get Trello Workspace Boards
export const getTrelloWorkspaceBoards = async (req: Request, res: Response) => {
    try {
        console.log("---------------------> req.params.id", req.params.id)
  const workspace= await Workspace.findById(req.params.id)   
  console.log("workspace :",workspace)   
  const response = await axios.get(`${configData.baseURL}/organizations/${workspace?.trelloWorkspace}/boards?${configData.auth}`);  
  res.status(200).json( response.data);
  
  } catch (err:any) {
       res.status(401).json({error:err.response.data});
     }
  };
  
  
  
  
