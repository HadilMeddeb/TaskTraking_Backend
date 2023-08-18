import { Schema, Document } from 'mongoose';

//adress
interface IAddress  {
    street: string;
    city: string;
    zip: string;
  }

interface I_Address extends Document {
    street: string;
    city: string;
    zip: string;
  }


const addressSchema = new Schema<I_Address>({
    street: String,
    city: String,
    zip: String,
  });


  export  {addressSchema ,IAddress } 