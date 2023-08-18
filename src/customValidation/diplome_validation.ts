import { IDiplome } from "../extra/diplome_schema";

export const diplomeValidation=(value :IDiplome) => {
    if (!value.titre|| 
        !value.date_obtention) {
      return false
    }
    return true;
  }