import {
  BadRequestError,
} from "@portail_entreprise/common";
import { Request, Response } from "express";
import { Client } from "../../models/Client";


export const updateClient = async (req: Request, res: Response) => {

    try {
        const updatedClient = await Client.findOneAndUpdate({_id:req.params.id},req.body, { new: true });
        console.log("here is the client :",updatedClient )

        res.status(200).json(updatedClient)     
    } catch (err) {
      console.log("error :", err);
      throw new BadRequestError("something went wrong !");
    }
};



export const addPhoneNumbersAndEmails = async (req: Request, res: Response) => {  
  try {
    const client=await Client.findById({_id:req.params.id})
if (client)
{
  req.body.phones.forEach(async (element:any) => {
    if (client.phones.indexOf(element) == -1){
      const updatedClient = await Client.findOneAndUpdate(
        { _id: req.params.id },
        { $push: {
            phones: element
        }},{new:true}
      );
      console.log("updatedClient :", updatedClient)
    }
   });

   req.body.emails.forEach(async (element:any) => {
    if (client.emails.indexOf(element) == -1){
      const updatedClient = await Client.findOneAndUpdate(
        { _id: req.params.id },
        { $push: {
            emails: element
        }},{new:true}
      );
      console.log("updatedClient :", updateClient)
    }
   });
}

      res.status(200).json(client);
    } catch (err) {
      console.log(err);
    }
  };


  export const removeEmail = async (req: Request, res: Response) => {
    try {
      const updatedClient = await Client.findByIdAndUpdate({_id:req.params.id},
        { $pull: { emails: req.body.email} },
        { new: true }
        )
        
      res.status(200).json(updatedClient);
    } catch (err) {
      console.log(err);
    }
  };

export const removePhoneNumber = async (req: Request, res: Response) => {
    try {
      console.log("req.body.phone :", req.body.phone)
      const updatedClient = await Client.findByIdAndUpdate({_id:req.params.id},
        { $pull: { phones: req.body.phone} },
        { new: true }
        )
      res.status(200).json(updatedClient);
    } catch (err) {
      console.log(err);
    }
  };
  




















  /*
  
  
      db.stores.updateMany(
        { },
        { $pull: { fruits: { $in: [ "apples", "oranges" ] }, vegetables: "carrots" } }
    
        )
  
  
  */