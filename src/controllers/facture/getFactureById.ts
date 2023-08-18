import {BadRequestError} from "@portail_entreprise/common";
import { Request, Response } from "express";
import { Facture } from "../../models/Facture";
  
  //get task
export const getFactureById = async (req: Request, res: Response) => {
    try {
      const facture = await Facture.findById(req.params.id)
      console.log("---------factuuuuuuuuuuuuuuuuuuuuure :", facture)
      res.status(200).json(facture);
    } catch (err) {
      console.log("error :", err);
      throw new BadRequestError("something went wrong !");
    }
  };
  