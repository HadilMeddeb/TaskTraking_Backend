import { Request, Response } from "express";
import "express-async-errors";
import { Task } from "../../models/Task";
const ExcelJS = require('exceljs');
const path = require('path');

export const exportTaskDataToExcel = async (req: Request, res: Response) => {
    const Tasks= await Task.find({id_workspace: req.params.workspace})
    console.log("tasks ----------> :", Tasks)
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');
    
    worksheet.columns = [
        { header: 'id_taskProposition', key: 'id_taskProposition', width: 15 },
        { header: 'id_workspace', key: 'id_workspace', width: 15 },
        { header: 'idTrelloCard', key: 'idTrelloCard', width: 15 },
        { header: 'idCardWebhhok', key: 'idCardWebhhok', width: 15 },
        { header: 'currentTrelloListId', key: 'currentTrelloListId', width: 15 },
        { header: 'CardTrelloUrl', key: 'CardTrelloUrl', width: 15 },
        { header: 'id_responsable', key: 'id_responsable', width: 15 },
        { header: 'name', key: 'name', width: 15 },
        { header: 'description', key: 'description', width: 15 },
        { header: 'start', key: 'start', width: 15 },
        { header: 'end', key: 'end', width: 15 },
        { header: 'dateEcheance', key: 'dateEcheance', width: 15 },
        { header: 'completed', key: 'completed', width: 15 },
        { header: 'paimentStatus', key: 'paimentStatus', width: 15 },
        { header: 'idFactureReelle', key: 'idFactureReelle', width: 15 },
        { header: 'idFacturePrevisionnelle', key: 'idFacturePrevisionnelle', width: 15 },
        { header: 'collaborators', key: 'collaborators', width: 15 },
        { header: 'checkLists', key: 'checkLists', width: 15 },
        { header: 'createdAt', key: 'createdAt', width: 15 }];
try
{
Tasks.forEach(item => {
    worksheet.addRow({
        id_taskProposition: item.id_taskProposition,
        id_workspace: item.id_workspace,
        idTrelloCard: item.idTrelloCard,
        idCardWebhhok: item.idCardWebhhok,
        currentTrelloListId: item.currentTrelloListId,
        CardTrelloUrl: item.CardTrelloUrl,
        id_responsable: item.id_responsable,
        name: item.name,
        description: item.description,
        relatedProject: item.relatedProject,
        start: item.start,
        end: item.end,
        dateEcheance: item.dateEcheance,
        completed: item.completed,
        paimentStatus: item.paimentStatus,
        idFacturePrevisionnelle: item.idFacturePrevisionnelle,
        idFactureReelle: item.idFactureReelle,
        idFactureFacturee: item.idFactureFacturee,
        collaborators: item.collaborators,
        checkLists: item.checkLists,
        createdAt: item.createdAt,
    });
  });
  // "./src/uploads/profile_images"
// Save the workbook to a file
const excelFilePath = path.join("/home/doudo/Desktop/test/auth/src/uploads/excels", 'data.xlsx');
await workbook.xlsx.writeFile(excelFilePath);
console.log('Excel file saved:', excelFilePath);
res.download(excelFilePath);
res.status(200).json(excelFilePath)
  }
catch(err)
{
console.log("error :", err)
res.status(200).json({error:err})
}
}

 export  const importExcelAndInsertData=async()=> {
    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile('src/controllers/Excel/data.xlsx');
  
      const worksheet = workbook.getWorksheet('Data');
      const dataRows = worksheet.getSheetValues();
  
      // Assuming the first row contains headers and data starts from the second row

      worksheet.eachRow({ includeEmpty: false }, async (row:any, rowNumber:number) => {
        if (rowNumber > 1) {
          const [ 
            id_taskProposition,
            id_workspace,
            id_responsable,
            name,
            description,
            relatedProject,
            dateEcheance,
            paimentStatus] = row.values;
            console.log("eeeeeeeeeeeeeeeeeeeeeeeeee :",{ 
              id_taskProposition,
              id_workspace,
              id_responsable,
              name,
              description,
              relatedProject,
              dateEcheance,
              paimentStatus} )
    const findedTasks=await Task.find({$or:[ 
      { name: name }]})
    console.log("------------------------>zzzzzzzzzzzzz :",findedTasks)
    if(findedTasks.length==0 &&id_workspace&&name&&description &&id_responsable&&paimentStatus)
    {console.log("-----------------------> creating Task---------------------------> ")
      const createdTask = await Task.build({     
        id_taskProposition,
        id_workspace,
        id_responsable,
        name,
        description,
        relatedProject,
        dateEcheance,
        paimentStatus
      }).save()
       console.log("-----------------------> createdTask :", createdTask)
    }
        }
      });
      console.log('Data inserted successfully');
    } catch (err) {
      console.error('Error reading Excel file and inserting data:', err);
    }
  }


