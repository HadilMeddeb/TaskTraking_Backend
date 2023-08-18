import axios from "axios";
import { Response, Request } from "express";

const baseURL = "https://api.trello.com/1/";
const key = "88527dd61ad373184107a66b06091a9d";
const token ="ATTA4c2aeac3634ce4f06d0dd547051484c39963943a3b1e951f22db6f8543e88cd71452AAC5";
const auth = `key=${key}&token=${token}`;


//getAllBoardsOfAWorkspace
export const getTrelloBoards = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${baseURL}members/me/boards?${auth}`);
    res.status(200).send(response.data);
  } catch (err:any) {
    console.log("errors :", err);
    res.status(401).send(err.response.data);
  }
};

// card
//getBoardById
export const getBoardById = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `${baseURL}/boards/${req.params.id}?${auth}`
    );
    res.status(200).send(response.data);
  } catch (err:any) {
    res.status(401).send(err.response.data);
  }
};

//create a board
export const createBoard = async (req: Request, res: Response) => {
  console.log("*********************************")
   try {
     const response = await axios.post(
       `${baseURL}/boards/name=test?${auth}`,
         req.body
     );
     console.log("heyyyyyyyyyyy",response)
     res.status(200).send(response.data);
   } catch (err:any) {
     res.status(401).send(err.response.data);
   }
};

//supprimer un tableau
export const DeleteBoard = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `${baseURL}/boards/${req.params.id}?${auth}`
    );
    res.status(200).send(response.data);
  } catch (err) {
    res.status(401).send(err);
  }
};

//ajouter un membre au tableau
//suprimer un membre du tableau


// getBoardLists
export const getBoardLists = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `${baseURL}/boards/${req.params.id}/lists?${auth}`
    );
    res.status(200).send(response.data);
  } catch (err:any) {
    res.status(401).send(err.response.data);
  }
};


// createList
export const createList = async (req: Request, res: Response) => {
  try {
    const response = await axios.post(
      `${baseURL}/lists?name=${req.body.name}&idBoard=${req.params.id}&${auth}`
    );
    res.status(200).send(response.data);
  } catch (err:any) {
    res.status(401).send(err.response.data);
  }
};

//getListCards
export const getListCards = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `${baseURL}lists/${req.params.list}/cards?${auth}`
    );
    console.log(response.data);
    res.status(200).send(response.data);
  } catch (err:any) {
    res.status(401).send(err.response.data);
  }
};

//getBoardCards
export const getBoardCards = async (req: Request, res: Response) => {
  try {
    console.log(`${baseURL}boards/${req.params.id}/cards?${auth}`);
    const response = await axios.get(
      `${baseURL}boards/${req.params.id}/cards?${auth}`
    );
    res.status(200).send(response.data);
  } catch (err:any) {
    res.status(401).send(err.response.data);
  }
};

//get card by id
export const getCardById = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `${baseURL}cards/${req.params.card}?${auth}`
    );
    res.status(200).send(response.data);
  } catch (err:any) {
    res.status(401).send(err.response.data);
  }
};

//update a card
export const updateCard = async (req: Request, res: Response) => {
  try {
    const response = await axios.put(
      `${baseURL}/cards/${req.params.card}&${auth}`,
      req.body
    );
    res.status(200).send(response.data);
  } catch (err:any) {
    console.log("errors :", err);
    res.status(401).send(err.response.data);
  }
};

//create a new card
export const createCard = async (req: Request, res: Response) => {
  console.log("request body : ", req.body);
  try {
    const response = await axios.post(
      `${baseURL}/cards?idList=${req.body.idList}&${auth}`,
      req.body
    );
    res.status(200).send(response.data);
  } catch (err:any) {
    res.status(401).send(err.response.data);
  }
};


/// create Webhook On Card To Get Notified Whenever Task Has Terminated
export const WebhookOnCard = async (req: Request, res: Response) => {
  try {
    const response = await axios.post(
      `${baseURL}webhooks/?callbackURL=${req.body.callbackURL}&idModel=${req.body.idModel}&${auth}`
    );
    res.status(200).send(response.data);
  } catch (err: any) {
    console.log("errrror :", err.response.data);
    res.status(401).send(err.response.data);
  }
};


export const WebhookOnWorksapce = async (req: Request, res: Response) => {
  try {
    const response = await axios.post(
      `${baseURL}webhooks/?callbackURL=${req.body.callbackURL}&idModel=${req.body.idModel}&${auth}`
    );
    res.status(200).send(response.data);
  } catch (err: any) {
    console.log("errrror :", err.response.data);
    res.status(401).send(err.response.data);
  }
};


/// create Webhook On Card To Get Notified Whenever Task Has Terminated
export const getNotifiedFromWebhook = async (req: Request, res: Response) => {
  try {
    console.log("infos sent from card webhook", req.body);
    res.status(200).send(req.body);
  } catch (err:any) {
    res.status(401).send(err.response.data);
  }
};



///get all webhooks
export const getWebhooks = async (req: Request, res: Response) => {
  console.log(`${baseURL}webhooks?${auth}`);
  try {
    const response = await axios.get(
      `${baseURL}tokens/${token}/webhooks/?key=${key}`
    );
    res.status(200).send(response.data);
  } catch (err: any) {
    console.log("errrror :", err.response.data);
    res.status(401).send(err.response.data);
  }
};



//delete webhooksOnAmodel
export const deleteModelWebhooks = async (req: Request, res: Response) => {
  console.log(`${baseURL}webhooks?${auth}`);
  try {
    const response = await axios.get(
      `${baseURL}tokens/${token}/webhooks/?key=${key}`
    );
    let webhooks = [];
    if (!(response.data.length == 0)) {
      for (let element of response.data) {
        if (element.idModel == req.params.idModel) {
          webhooks.push(element.id);
        }
      }
      for (let element of webhooks) {
        const response = await axios.delete(
          `${baseURL}webhooks/${element.id}?${auth}`
        );
        console.log("response ", response.data);
      }
      res.status(200).send({ message: "deleted succss" });
    } else {
      res.status(200).send({ message: "no webhooks in the system" });
    }
  } catch (err: any) {
    console.log("errrror :", err.response.data);
    res.status(401).send(err.response.data);
  }
};

//créer une organisation 
export const createOrganization = async (req: Request, res: Response) => {
   console.log(`${baseURL}webhooks?${auth}`);
   try {
      const response = await axios.post(
         `${baseURL}organizations&${auth}`,
            req.body
      );
     res.status(200).send(response.data);
   } catch (err: any) {
     console.log("errrror :", err.response.data);
     res.status(401).send(err.response.data);
   }
 };









//supprimer un card

//ajouter une etiquette

//ajouter un membre sur un card

//supprimer un membre du card

/*





njarreb na3ml création d'un card wel webhook mte7he 
wba3d metoufa lcard
na3mlou
update lel task comme terminated 

--------> lezem na9ra 7seb el paiment
--------> na9ra 7seb  femme des tache te7tej elvalidation w des taches le selon lcatrgorie mte7he 
--------> femme des taches payés w des taches le  les taches payé chikoun 3andhom 3 variable elfrais prévisionnel , frais réel , frais facturée
--------> génération de facture à la fin na9a fih hel les trois frais
             
Facture :
   
             -  tools : { tool:string,frais:float}
             -  nbheureTotale : number 
             -  nbPersonnelInclus : number
             -  nbReunion : {id_reunion:string, durée: number, date:Date} []
             -  fraisPersonnel {nbHeure: number, membre:id ,fraisHoraire:float} []
             -  des frais en excés :{frais:float, raison:string }


*/
