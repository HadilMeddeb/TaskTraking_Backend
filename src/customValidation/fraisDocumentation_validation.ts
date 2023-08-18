import { IDocumentation } from "../extra/Facture/fraisDocumentation";

export const FraisDocumentation=(value :IDocumentation) => {
    if (!value.fraisRedaction|| 
        !value.fraisSupportClient) {
      return false
    }
    return true;
  }