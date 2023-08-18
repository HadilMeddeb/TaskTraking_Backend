import { Schema, Document } from 'mongoose';

 //diplome
 interface IAssociationCollaboratorMember  {
    trelloCollaborator:string,
    idWorkspaceMember: string;
}
  
interface I_AssociationCollaboratorMember extends Document {
    trelloCollaborator: string;
    idWorkspaceMember: string;
}


const associationCollaboratorMemberSchema = new Schema<I_AssociationCollaboratorMember>({
    trelloCollaborator: String,
    idWorkspaceMember: String,
    
  });

  export  {associationCollaboratorMemberSchema ,IAssociationCollaboratorMember}