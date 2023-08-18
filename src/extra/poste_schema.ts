import { Schema, Document } from 'mongoose';

 //poste
 interface IPoste  {
    titre: string;
    departement: string;
  }

  interface I_Poste extends Document {
    titre: string;
    departement: string;
  }


 const posteSchema = new Schema<I_Poste>({
    titre: String,
    departement: String,
  });


  export {posteSchema ,IPoste}


