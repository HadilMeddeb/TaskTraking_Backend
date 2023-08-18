
import axios from "axios";
import { Response, Request } from "express";
import {configData} from "../../config/ConfigData"

const baseURL = "https://api.trello.com/1/";
const key = "88527dd61ad373184107a66b06091a9d";
const token ="ATTA4c2aeac3634ce4f06d0dd547051484c39963943a3b1e951f22db6f8543e88cd71452AAC5";
const auth = `key=${key}&token=${token}`;



// createList
export const getAllTrelloWorkspaces = async (req: Request, res: Response) => {
    try {
      const response = await axios.get(
        `${configData.baseURL}/members/me/organizations?${auth}`
      );
      res.status(200).send(response.data);
    } catch (err:any) {
      res.status(401).send(err.response.data);
    }
  };
  
