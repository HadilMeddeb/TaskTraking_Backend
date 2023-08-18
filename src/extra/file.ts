import { Schema, Document } from 'mongoose';

 //diplome
interface IFile  {
    originalname: string;
    encoding: string;
    filename: Date;
    size:Number;
    mimetype: String;
  }

interface I_File extends Document {
    originalname: string;
    encoding: string;
    filename: Date;
    size:Number;
    mimetype: String;
  }


const fileSchema = new Schema<I_File>({
    originalname: String,
    encoding: String,
    filename: String,
    size:Number,
    mimetype: String
  });

  export  {fileSchema ,IFile}