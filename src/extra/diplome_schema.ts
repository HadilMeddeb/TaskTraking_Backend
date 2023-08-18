import { Schema, Document } from 'mongoose';

 //diplome
 interface IDiplome  {
    _id:string,
    titre: string;
    faculte: string;
    date_obtention: Date;
  }
  interface I_Diplome extends Document {
    titre: string;
    faculte: string;
    date_obtention: Date;
  }


const diplomeSchema = new Schema<I_Diplome>({
    titre: String,
    faculte: String,
    date_obtention: Date,
  });

  export  {diplomeSchema ,IDiplome}