import { IPoste } from "../extra/poste_schema";
export const posteValidation=(value :IPoste) => {
    if (!value.departement|| 
        !value.titre) {
      return false
    }
    return true;
  }