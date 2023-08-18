import { Request, Response } from "express";
import { Facture } from "../../models/Facture";
import { Task } from "../../models/Task";
  

export const addFacturePrevisionnelle = async (req: Request, res: Response) => {
    console.log("reqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq:", req.body);
    const {
      id_Task,
      fraisRessourceHumaine,
      fraisHebergement,
      fraisRessourcesLogicielle,
      fraisDocumentation,
      fraisRessourcesMaterielles,
      fraisSupplementaires,
    } = req.body;
    
    console.log ("-------------------fraisRessourceHumaine :",fraisRessourceHumaine)
  
    const facturePrevisionelle = await Facture.build({
      id_Task,
      fraisRessourceHumaine,
      fraisHebergement,
      fraisRessourcesLogicielle,
      fraisDocumentation,
      fraisRessourcesMaterielles,
      fraisSupplementaires,
    }).save();
  
    console.log("facturePrevisionelle :",facturePrevisionelle)
  
    const resultedTask = await Task.findOneAndUpdate(
      {_id:id_Task},
      {
        idFacturePrevisionnelle: facturePrevisionelle.id,
      },
      { new: true }
    );
    console.log("resultedTask : ", resultedTask);
    res.status(200).json(resultedTask);
  };
  
  export const addFacture = async (req: Request, res: Response) => {
    console.log("111111111111111111111111111111111111111111111111111111111 :", req.body)

    const {
      id_Task,
      fraisRessourceHumaine,
      fraisHebergement,
      fraisRessourcesLogicielle,
      fraisDocumentation,
      fraisRessourcesMaterielles,
      fraisSupplementaires,
      natureFacture
    } = req.body;
    
    const facture= await Facture.build({
      id_Task,
      fraisRessourceHumaine,
      fraisHebergement,
      fraisRessourcesLogicielle,
      fraisDocumentation,
      fraisRessourcesMaterielles,
      fraisSupplementaires,
    }).save();
  
    if(natureFacture=="reelle")
    {
        const resultedTask = await Task.findOneAndUpdate(
            {_id:id_Task},
            {
              idFactureReelle: facture.id,
            },
            { new: true }
          );
          console.log("resultedTask : ", resultedTask);
          res.status(200).json(resultedTask);
    }
    else if(natureFacture=="facturee")
    {
        const resultedTask = await Task.findOneAndUpdate(
            {_id:id_Task},
            {
                idFactureFacturee: facture.id,
            },
            { new: true }
          );
          console.log("resultedTask : ", resultedTask);
          res.status(200).json(resultedTask);
    }
    else
    {
        const resultedTask = await Task.findOneAndUpdate(
            {_id:id_Task},
            {
              idFacturePrevisionnelle: facture.id,
            },
            { new: true }
          );
          console.log("resultedTask : ", resultedTask);
          res.status(200).json(resultedTask);
    }

  };
  