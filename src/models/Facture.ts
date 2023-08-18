import { Schema, model, Model, Document } from "mongoose";
import {
  documentationSchema,
  IDocumentation,
} from "../extra/Facture/fraisDocumentation";
import {
  fraisSupplementaireSchema,
  IFraisSupplementaire,
} from "../extra/Facture/fraisSupplémentaire";
import {
  fraisPieceInformatiqueSchema,
  IFraisPieceInformatique,
} from "../extra/Facture/ressourceMaterielle/PieceInformatique";
import {
  fraisRessourceHumaineSchema,
  IFraisRessourceHumaine,
} from "../extra/Facture/ressourcesHumaine/fraisRessourceHumaine";
import {
  fraisRessourceLogicielleSchema,
  IFraisRessourceLogicielle,
} from "../extra/Facture/ressourcesLogicielle/fraisRessourcesLogicielle";

// An interface that describes the properties
// that are requried to create a new Facture
interface FactureAttrs {
  id_Task: Schema.Types.ObjectId;
  fraisRessourceHumaine?: IFraisRessourceHumaine;
  fraisHebergement?: Number;
  fraisRessourcesLogicielle?: IFraisRessourceLogicielle;
  fraisDocumentation?: IDocumentation;
  fraisRessourcesMaterielles?: [IFraisPieceInformatique];
  fraisSupplementaires?: [IFraisSupplementaire];
}

// An interface that describes the properties
// that a Facture Model has
interface FactureModel extends Model<FactureDoc> {
  build(attrs: FactureAttrs): FactureDoc;
}

// An interface that describes the properties
// that a Facture Document has
interface FactureDoc extends Document {
  id_Task: Schema.Types.ObjectId;
  fraisRessourceHumaine: IFraisRessourceHumaine;
  fraisHebergement: Number;
  fraisRessourcesLogicielle: IFraisRessourceLogicielle;
  fraisDocumentation: IDocumentation;
  fraisRessourcesMaterielles: [IFraisPieceInformatique];
  fraisSupplementaires: [IFraisSupplementaire];
  fraisSupplementairesTotale: number;
  fraisRessourceHumaineTotale: number;
  fraisDocumentationTotale: number;
  fraisRessourcesMateriellesTotale: number;
  fraisRessourcesLogicielleTotale: number;
}

const factureSchema = new Schema(
  {
    id_Task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    fraisRessourceHumaine: {
      type: fraisRessourceHumaineSchema,
    },
    fraisHebergement: {
      type: Number,
      default: 0,
    },

    fraisRessourcesLogicielle: {
      type: fraisRessourceLogicielleSchema,
    },
    fraisDocumentation: {
      type: documentationSchema,
    },
    fraisRessourcesMaterielles: {
      type: [fraisPieceInformatiqueSchema],
      default: [],
    },
    fraisSupplementaires: {
      type: [fraisSupplementaireSchema],
      default: [],
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
    toObject: { virtuals: true },
  }
);

factureSchema.statics.build = (attrs: FactureAttrs) => {
  return new Facture(attrs);
};

factureSchema.virtual("fraisRessourceHumaineTotale").get(function () {
  if (this.fraisRessourceHumaine != undefined) {
    return (
      this.fraisRessourceHumaine.totalFraisPersonnel +
      this.fraisRessourceHumaine.totalFraisFormation
    );
  } else return 0;
});

factureSchema.virtual("fraisSupplementairesTotale").get(function () {
  let sum = 0;
  this.fraisSupplementaires.forEach((element) => {
    console.log("new sum :", sum);
    sum += element.frais;
  });
  console.log("result sum :", sum);
  return sum;
});

factureSchema.virtual("fraisDocumentationTotale").get(function () {
  if (this.fraisDocumentation != undefined) {
    return this.fraisDocumentation.total;
  } else return 0;
});

factureSchema.virtual("fraisRessourcesMateriellesTotale").get(function () {
  let sum = 0;
  this.fraisRessourcesMaterielles.forEach((element) => {
    console.log("new sum :", sum);
    sum += element.total;
  });
  console.log("result sum :", sum);
  return sum;
});

factureSchema.virtual("fraisRessourcesLogicielleTotale").get(function () {
  if (this.fraisRessourcesLogicielle != undefined) {
    return (
      this.fraisRessourcesLogicielle.fraisTotalDesLicences +
      this.fraisRessourcesLogicielle.fraisTotalDedOutilsDeveloppement
    );
  } else return 0;
});

factureSchema.virtual("total").get(function () {
  let sumRessourceHumaine = 0;
  let sumDocumentation = 0;
  let sumSupplementaire = 0;
  let sumRessourceLogicielles = 0;
  let sumRessourceMaterielle = 0;

  if (this.fraisRessourcesLogicielle != undefined) {
  
    sumRessourceLogicielles = this.fraisRessourcesLogicielle.total;
  }

  if (this.fraisSupplementaires != undefined) {
    this.fraisSupplementaires.forEach((element) => {
      sumSupplementaire += element.frais;
    });
  }

  if (this.fraisRessourceHumaine != undefined) {
    sumRessourceHumaine = this.fraisRessourceHumaine.total;
  }

  if (this.fraisRessourcesMaterielles != undefined) {
    this.fraisRessourcesMaterielles.forEach((element) => {
      sumRessourceMaterielle += element.total;
    });
  }

  if (this.fraisDocumentation != undefined) {
    sumDocumentation = this.fraisDocumentation.total;
  }

console.log('--------------------------------------------> :sumRessourceHumaine',sumRessourceHumaine)
console.log('--------------------------------------------> :sumDocumentation',sumDocumentation)
console.log('--------------------------------------------> :sumSupplementaire',sumSupplementaire)
console.log('--------------------------------------------> :sumRessourceLogicielles',sumRessourceLogicielles)
console.log('--------------------------------------------> :sumRessourceMaterielle',sumRessourceMaterielle)

  return (
    sumRessourceHumaine +
    sumDocumentation +
    sumSupplementaire +
    sumRessourceLogicielles +
    sumRessourceMaterielle +
    this.fraisHebergement
  );
});

const Facture = model<FactureDoc, FactureModel>("Facture", factureSchema);
export { Facture };
