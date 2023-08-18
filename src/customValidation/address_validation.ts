import { IAddress } from "../extra/adress_schema";
export const adressValidation=(value :IAddress) => {
    if (!value.city|| 
        !value.street||
        !value.zip) {
      return false
    }
    return true;
  }