 
 import { Schema, Document } from 'mongoose';
 //experience
 interface IExperience  {
    _id:string,
    titre: string;
    societe: string;
    start_Date: Date;
    end_Date: Date;
    description: String;
}
interface I_Experience extends Document {
  titre: string;
  societe: string;
  start_Date: Date;
  end_Date: Date;
  description: String;
}
const experienceSchema = new Schema<I_Experience>({
    titre: String,
    societe: String,
    start_Date: Date,
    end_Date: Date,
    description: String,
    
  });

export {experienceSchema ,IExperience} 
