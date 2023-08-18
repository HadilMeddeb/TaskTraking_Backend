import { Request, Response } from "express";
import {
  BadRequestError,
  NotAuthorizedError,
} from "@portail_entreprise/common";
import "express-async-errors";
import { TaskProposition } from "../../models/Task_proposition";


export const GetStatisticsOfTaskProposition = async (req: Request, res: Response) => {

    try {
      const propositions = await TaskProposition.find({ id_workspace: req.params.id });
      console.log("propositions number :", propositions.length)

      let  nb_refused : number =0
      let  nb_accepted : number =0
      let  nb_falseClaims : number =0
      let  nb_enAttenteClarification : number =0 
      let  nb_enAttenteValidation : number =0
      let  total: number = propositions.length
      let i=0
      propositions.map((prop)=>{
        i++;
        console.log("counter :", i)
        switch(prop.status) { 
            case "refusée": { 
                console.log("proposition ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",prop.status)
               nb_refused ++;
               break; 
            } 
            case "acceptée": { 
                console.log("proposition acceptéeacceptéeacceptéeacceptéeacceptéeacceptéeacceptéeacceptéeacceptéeacceptéeacceptéeacceptéeacceptéeacceptéeacceptéeacceptée",prop.status)
                nb_accepted ++; 
               break; 
            } 
            case "false claim": { 
                console.log("proposition /////////////////////////////////////////////////////////////////////////////////",prop.status)
               nb_falseClaims++; 
               break; 
            } 
            case "à valider": { 
                console.log("proposition -----------------------------------------------------------------------------------",prop.status)
                nb_enAttenteValidation++; 
                break; 
             }
            case "à clarifier" : { 
                console.log("proposition ***********************************************************************************",prop.status)
                nb_enAttenteClarification++; 
                break; 
             } 
         }})

      res.status(200).json({nb_refused,nb_accepted,nb_falseClaims,nb_enAttenteClarification,nb_enAttenteValidation,total: total- nb_falseClaims});
    } catch (err) {
      console.log("------------------------------error :", err);
      throw new BadRequestError("something went wrong !");
    }

};