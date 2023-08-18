import axios from "axios";
import { Response, Request } from "express";
import { configData } from "../../config/ConfigData";




// ************** get Board lists 
export const getTrelloBoardLists = async (req: Request, res: Response) => {
    try {
  const response = await axios.get(`${configData.baseURL}/boards/${req.params.id}/lists?${configData.auth}`);  
  res.status(200).send( response.data);
  
  } catch (err:any) {
       res.status(401).send(err.response.data);
     }
  };
  



